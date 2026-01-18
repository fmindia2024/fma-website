import json
import os
import glob

# Path to data.json
data_file_path = 'data.json'

# Supported image extensions
image_extensions = {'.png', '.jpg', '.jpeg', '.webp'}

def update_gallery():
    try:
        with open(data_file_path, 'r') as f:
            data = json.load(f)

        base_dir = os.path.dirname(os.path.abspath(data_file_path))

        for work in data.get('works', []):
            # Infer folder from image_main if available
            main_image_path = work.get('image_main', '')
            if not main_image_path:
                print(f"Skipping {work.get('id')} - no image_main")
                continue
            
            # Extract relative folder path (e.g., "images/Work/competition italy")
            # Assuming path is relative to the web root, which matches filesystem here
            rel_folder = os.path.dirname(main_image_path)
            abs_folder = os.path.join(base_dir, rel_folder)

            if not os.path.exists(abs_folder):
                print(f"Folder not found: {abs_folder}")
                continue

            # Gather all images
            all_images = []
            for root, dirs, files in os.walk(abs_folder):
                for file in files:
                    if os.path.splitext(file)[1].lower() in image_extensions:
                        # Construct relative path
                        # We want path relative to 'data.json' location, essentially 'images/...'
                        full_path = os.path.join(root, file)
                        rel_path = os.path.relpath(full_path, base_dir)
                        all_images.append(rel_path)

            # Sort images to maintain some order (e.g. by name)
            all_images.sort()

            # Assign to work object
            # User wants ALL images. We can keep image_main as the "Hero" preference if needed, 
            # but usually it's best to include everything in gallery and let the frontend filter default main.
            # However, let's just make 'gallery' containing EVERYTHING.
            work['gallery'] = all_images
            print(f"Updated {work['id']}: found {len(all_images)} images.")

        with open(data_file_path, 'w') as f:
            json.dump(data, f, indent=2)

        print("Successfully updated data.json")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_gallery()
