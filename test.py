# x = 3
# x = 3.0
# x = True
# x = "three"

# def x(x):
#     print(x)
#     print(x) ##from stack overflow here: 

x=5
# if x < 3:
#     print("True")
# elif x < 5:
#     print("Bob")
# elif x < 7:
#     print("Carl", end="\t")
#     if x == 6:
#         print("Jr")
# else:
#     print("Alice")

# y = "7"
# print(str(x)+"\t"+y)
# print(x+int(y))

a = [1,2]
a.append(3)
a += [4]
a = [5] + a
# for i in range(len(a)):
#     print(i, end=" ")
#     print(a[i])
# print(list(range(0,len(a),2)))
# i = 0
# while i<len(a):
#     print(a[i])
#     i+=1

# for el in a:
#     print(el)

# f = open("Dockerfile","r")
# for line in f:
#     if "code" in line or "WORKDIR" in line:
#         stripped_line = line.rstrip()
#         print(stripped_line)
    
# a += ["hi"]
# a += [3.0]
# a += [True]
# print(a)
# def x():
#     print("bob")

d = {True:x}
# d["key"] = "value"
# d["key"] += "value2"
# d["key"] = [1,2,3,4]
# d["key2"] = {"key3":"value"}

# d[3<4]()

t = (1,2,3)
# a = [4,5,6]
d[t]="bob"
# d[a]="alice"
# print(d)

def fun(a,b="bob",c="alice"):
    print(a)
    print(b)
    print(c)

# fun("hi", c="carl")
# fun(b="a",c="b",a="c")

# def create_adder(x):
#     def adder(y):
#         return x + y
#     return adder

# add_10 = create_adder(10)
# print(add_10(3))   

class Human:
    species = "H. sapiens"

    def __init__(self, name):
        self.name = name
        self.age = 0

    def about(self):
        print(self.name + " is " 
            + str(self.age) + " years old"
            + " and is of species " + self.species)

class Student(Human):
    def __init__(self, name, year):
        self.year = year
        super().__init__(name)
    
    def about(self):
        print(self.name + " is " 
            + str(self.age) + " years old"
            + " and a " + self.year)

i = Human(name="Bob")
i.about()

s = Student(name="alice",year="Sophomore")
s.about()






