import urllib.request
import os

images_dir = "../static/images"
os.makedirs(images_dir, exist_ok=True)

# 产品分类图片 (真实产品照片，方形适合铺满)
images = [
    # Amino Acids - 蛋白质/氨基酸粉/胶囊
    ("amino-icon.png", "https://images.pexels.com/photos/374102/pexels-photo-374102.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"),
    # Vitamins - 维生素片/药丸
    ("vitamins-icon.png", "https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"),
    # Minerals - 矿物质/盐类晶体
    ("minerals-icon.png", "https://images.pexels.com/photos/3895047/pexels-photo-3895047.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"),
    # Sweeteners - 糖/甜味剂
    ("sweeteners-icon.png", "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"),
    # Herbal Extracts - 草本植物/茶叶
    ("herbal-extract-icon.png", "https://images.pexels.com/photos/236799/pexels-photo-236799.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"),
    # Organic - 有机农产品
    ("organic-icon.png", "https://images.pexels.com/photos/15276497/pexels-photo-15276497.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"),
    # Gummies - 软糖补充剂
    ("gummie-icon.png", "https://images.pexels.com/photos/9886340/pexels-photo-9886340.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"),
    # Specialty/Tablets - 片剂
    ("tablets-icon.png", "https://images.pexels.com/photos/4046717/pexels-photo-4046717.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"),
    # Hero 主图
    ("hero-ingredients.jpg", "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop"),
    # 文档中心
    ("ingredient-doc-center.jpg", "https://images.pexels.com/photos/7657348/pexels-photo-7657348.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"),
    # 制造工厂
    ("manufacturing.jpg", "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"),
    # Why Choose
    ("why-choose.jpg", "https://images.pexels.com/photos/3735766/pexels-photo-3735766.jpeg?auto=compress&cs=tinysrgb&w=400&h=450&fit=crop"),
]

for name, url in images:
    filepath = os.path.join(images_dir, name)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as response:
            with open(filepath, "wb") as f:
                f.write(response.read())
        print(f"OK: {name}")
    except Exception as e:
        print(f"FAIL: {name} - {e}")
