import os
from datetime import date

os.system("git add .")
os.system(f"git commit -m 'images - day{date.today()}'")

print("DONE")
