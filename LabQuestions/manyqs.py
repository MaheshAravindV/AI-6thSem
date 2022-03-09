from codecs import namereplace_errors
import random

l = list(map(int,input("Enter list elements ").split()))

print(l[random.randint(0,len(l)-1)]) #Print random number from a list

print(len(l)) #Count number of items in a  list

ls = sorted(l)
print(ls) #Sort the list

lr = l[::-1] #Reverse the list
print(lr)

lsq = [l[i]**2 for i in range(len(l))] #Square the list elements
print(lsq)

l.append(int(input("Enter item to be appended "))) #Append item to list
print(l)

l2 = list(map(int,input("Enter second list elements ").split())) #Concat another list
l += l2
print(l)

print(sum(l)) #Sum of list elements

print("MAX -",max(l),"MIN -",min(l)) #Max and min elements in the list

l = list(set(l)) #Remove duplicates from list

n = int(input("Enter element to be searched ")) #Search for element in the list
for id in range(len(l)):
    if l[id] == n:
        print(id)
        break
else:
    print("Element not found in the list")

odd = [i for i in l if i % 2 == 1] #Odd and even numbers filtering
even = [i for i in l if i % 2 == 0]
print(odd)
print(even)

l[0],l[-1] = l[-1],l[0] #Interchange last and first elemnt in the llist
print(l)