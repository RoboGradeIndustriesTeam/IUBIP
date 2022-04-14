import glob

files = [*glob.glob("src/**/*.*"), *glob.glob("public/**/*.*")]

a = 0;

for file in files:
    r = open(file, mode="r")

    t = r.readlines()

    c = len(t)
    
    a += c

print(a)