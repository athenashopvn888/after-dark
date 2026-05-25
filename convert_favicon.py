from PIL import Image
import os

webp_path = r'C:\Users\YesWe\Desktop\Dispensary Templates\after-dark\public\banners\after-dark_favicon.webp'
ico_path = r'C:\Users\YesWe\Desktop\Dispensary Templates\after-dark\app\favicon.ico'

try:
    img = Image.open(webp_path).convert('RGBA')
    # Resize to standard favicon sizes
    icon_sizes = [(16,16), (32, 32), (48, 48), (64,64)]
    img.save(ico_path, format='ICO', sizes=icon_sizes)
    print("Favicon updated successfully!")
except Exception as e:
    print(f"Error: {e}")
