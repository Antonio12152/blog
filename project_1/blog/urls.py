from django.urls import path
from .views import *


urlpatterns = [
    path('',post_lists,name='posts_list_url'),
    path('post/<str:slug>/',post_detail,name='post_detail_url'),
    path('tags/',tags_list,name='tags_list_url'),
    path('tags/<str:slug>/',tag_detail,name='tag_detail_url'),
    path('store',product_list,name='product_list_url'),
    path('store/<str:slug>/',product_detail,name='product_detail_url'),
    path('save_order',save_order,name='product_detail_url')
]
