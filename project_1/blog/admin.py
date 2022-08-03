from django.contrib import admin
from .models import Post, Tag, Product,Order


admin.site.register(Post)
admin.site.register(Tag)
admin.site.register(Product)

class OrderAdmin(admin.ModelAdmin):
    list_display = ['name','email','product']
admin.site.register(Order, OrderAdmin)
