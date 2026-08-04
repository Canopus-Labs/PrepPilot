import os
import glob
import re

src_dir = r"d:\downloads\Sigma Web Develpment\PrepPilot\frontend\src"

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".jsx", ".js")):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            
            new_content = content
            
            if "UserContext" in content and file != "userContext.jsx":
                new_content = re.sub(r'import\s*\{\s*UserContext\s*\}\s*from\s*(["\'].*?userContext["\']);?', r'import { useUser } from \1;', new_content)
                new_content = new_content.replace('useContext(UserContext)', 'useUser()')
                
                if new_content != content:
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Updated {path}")
