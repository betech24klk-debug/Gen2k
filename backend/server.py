from fastapi import FastAPI, APIRouter, HTTPException, Body
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from supabase import create_client, Client
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Supabase connection
supabase_url = os.environ['SUPABASE_URL']
supabase_key = os.environ['SUPABASE_KEY']
supabase: Client = create_client(supabase_url, supabase_key)

# Create the main app without a prefix
app = FastAPI(title="Portfolio Gallery API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ==================== MODELS ====================

class CategoryResponse(BaseModel):
    id: str
    name: str
    slug: str
    order: int

class ProjectImageResponse(BaseModel):
    id: str
    url: str
    caption: Optional[str] = None
    orientation: str = 'landscape'
    order: int

class ProjectResponse(BaseModel):
    id: str
    title: str
    slug: str
    description: Optional[str] = None
    category: str
    tags: List[str] = []
    thumbnail: Optional[str] = None
    imageCount: int = Field(alias='image_count')
    images: List[ProjectImageResponse] = []
    createdAt: str = Field(alias='created_at')

    class Config:
        populate_by_name = True

class SettingsResponse(BaseModel):
    logo: str
    siteName: str
    tagline: str
    whatsappNumber: str
    whatsappMessage: str
    footerDescription: str
    socialLinks: Dict[str, str]
    quickLinks: List[Dict[str, str]]

class AdminLoginRequest(BaseModel):
    password: str

class ProjectCreateRequest(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    category: str
    tags: List[str] = []
    thumbnail: Optional[str] = None
    published: bool = True

class ProjectUpdateRequest(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    thumbnail: Optional[str] = None
    published: Optional[bool] = None

class ProjectImageCreateRequest(BaseModel):
    project_id: str
    url: str
    caption: Optional[str] = None
    orientation: str = 'landscape'
    order: int = 0

# ==================== UTILITY FUNCTIONS ====================

def parse_settings_value(key: str, value: str, value_type: str) -> Any:
    """Parse settings value based on type"""
    if value_type == 'json':
        try:
            return json.loads(value)
        except:
            return {}
    return value

# ==================== ROUTES ====================

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "database": "supabase"}

# ==================== CATEGORIES ====================

@api_router.get("/categories", response_model=List[CategoryResponse])
async def get_categories():
    """Get all categories"""
    try:
        response = supabase.table('categories').select('*').order('order').execute()
        return response.data
    except Exception as e:
        logger.error(f"Error fetching categories: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/categories/{slug}", response_model=CategoryResponse)
async def get_category(slug: str):
    """Get category by slug"""
    try:
        response = supabase.table('categories').select('*').eq('slug', slug).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Category not found")
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching category: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ==================== PROJECTS ====================

@api_router.get("/projects", response_model=List[ProjectResponse])
async def get_projects(category: Optional[str] = None, published: bool = True):
    """Get all projects, optionally filtered by category"""
    try:
        query = supabase.table('projects').select('*, project_images(*)')
        
        if published:
            query = query.eq('published', True)
        
        if category and category != 'all':
            query = query.eq('category', category)
        
        response = query.order('created_at', desc=True).execute()
        
        # Transform data to match frontend expectations
        projects = []
        for project in response.data:
            images = sorted(project.get('project_images', []), key=lambda x: x.get('order', 0))
            projects.append({
                'id': project['id'],
                'title': project['title'],
                'slug': project['slug'],
                'description': project.get('description'),
                'category': project['category'],
                'tags': project.get('tags', []),
                'thumbnail': project.get('thumbnail'),
                'imageCount': len(images),
                'image_count': len(images),
                'images': images,
                'createdAt': project['created_at'],
                'created_at': project['created_at']
            })
        
        return projects
    except Exception as e:
        logger.error(f"Error fetching projects: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/projects/{slug}", response_model=ProjectResponse)
async def get_project(slug: str):
    """Get project by slug"""
    try:
        response = supabase.table('projects').select('*, project_images(*)').eq('slug', slug).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Project not found")
        
        project = response.data[0]
        images = sorted(project.get('project_images', []), key=lambda x: x.get('order', 0))
        
        return {
            'id': project['id'],
            'title': project['title'],
            'slug': project['slug'],
            'description': project.get('description'),
            'category': project['category'],
            'tags': project.get('tags', []),
            'thumbnail': project.get('thumbnail'),
            'imageCount': len(images),
            'image_count': len(images),
            'images': images,
            'createdAt': project['created_at'],
            'created_at': project['created_at']
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching project: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ==================== SETTINGS ====================

@api_router.get("/settings", response_model=SettingsResponse)
async def get_settings():
    """Get all settings"""
    try:
        response = supabase.table('settings').select('*').execute()
        
        # Transform settings array to object
        settings_obj = {}
        for setting in response.data:
            key = setting['key']
            value = parse_settings_value(key, setting['value'], setting.get('type', 'string'))
            settings_obj[key] = value
        
        return settings_obj
    except Exception as e:
        logger.error(f"Error fetching settings: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ==================== ADMIN ROUTES ====================

@api_router.post("/admin/login")
async def admin_login(request: AdminLoginRequest):
    """Admin login"""
    admin_password = os.environ.get('ADMIN_PASSWORD', 'Admin@JVA-2025-Port-Gallary_123')
    
    if request.password == admin_password:
        return {"success": True, "message": "Login successful"}
    
    raise HTTPException(status_code=401, detail="Invalid password")

@api_router.post("/admin/projects")
async def create_project(project: ProjectCreateRequest):
    """Create a new project (admin only)"""
    try:
        response = supabase.table('projects').insert({
            'title': project.title,
            'slug': project.slug,
            'description': project.description,
            'category': project.category,
            'tags': project.tags,
            'thumbnail': project.thumbnail,
            'published': project.published,
            'image_count': 0
        }).execute()
        
        return {"success": True, "data": response.data[0]}
    except Exception as e:
        logger.error(f"Error creating project: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/admin/projects/{project_id}")
async def update_project(project_id: str, project: ProjectUpdateRequest):
    """Update a project (admin only)"""
    try:
        update_data = {k: v for k, v in project.model_dump().items() if v is not None}
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No data to update")
        
        response = supabase.table('projects').update(update_data).eq('id', project_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Project not found")
        
        return {"success": True, "data": response.data[0]}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating project: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/admin/projects/{project_id}")
async def delete_project(project_id: str):
    """Delete a project (admin only)"""
    try:
        response = supabase.table('projects').delete().eq('id', project_id).execute()
        return {"success": True, "message": "Project deleted"}
    except Exception as e:
        logger.error(f"Error deleting project: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/admin/projects/{project_id}/images")
async def add_project_image(project_id: str, image: ProjectImageCreateRequest):
    """Add an image to a project (admin only)"""
    try:
        response = supabase.table('project_images').insert({
            'project_id': project_id,
            'url': image.url,
            'caption': image.caption,
            'orientation': image.orientation,
            'order': image.order
        }).execute()
        
        # Update project image count
        images_response = supabase.table('project_images').select('id').eq('project_id', project_id).execute()
        image_count = len(images_response.data)
        supabase.table('projects').update({'image_count': image_count}).eq('id', project_id).execute()
        
        return {"success": True, "data": response.data[0]}
    except Exception as e:
        logger.error(f"Error adding project image: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.delete("/admin/projects/images/{image_id}")
async def delete_project_image(image_id: str):
    """Delete a project image (admin only)"""
    try:
        # Get project_id before deleting
        image_response = supabase.table('project_images').select('project_id').eq('id', image_id).execute()
        if not image_response.data:
            raise HTTPException(status_code=404, detail="Image not found")
        
        project_id = image_response.data[0]['project_id']
        
        # Delete image
        supabase.table('project_images').delete().eq('id', image_id).execute()
        
        # Update project image count
        images_response = supabase.table('project_images').select('id').eq('project_id', project_id).execute()
        image_count = len(images_response.data)
        supabase.table('projects').update({'image_count': image_count}).eq('id', project_id).execute()
        
        return {"success": True, "message": "Image deleted"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting project image: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/admin/settings")
async def update_settings(settings: Dict[str, Any] = Body(...)):
    """Update settings (admin only)"""
    try:
        for key, value in settings.items():
            # Determine type
            value_type = 'string'
            if isinstance(value, (dict, list)):
                value_type = 'json'
                value = json.dumps(value)
            
            # Upsert setting
            supabase.table('settings').upsert({
                'key': key,
                'value': str(value),
                'type': value_type
            }).execute()
        
        return {"success": True, "message": "Settings updated"}
    except Exception as e:
        logger.error(f"Error updating settings: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
