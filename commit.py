import os
from datetime import date

os.system("git add .")
os.system(f"git commit -m 'images - {date.today()}'")
os.system("git push origin master")

print("DONE")
