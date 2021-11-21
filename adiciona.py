import csv
import pymongo
from pymongo import MongoClient
    
cliente = MongoClient("localhost", 27017)
print(cliente.list_database_names())

db = cliente.CRUD


#arq = open('membros.csv', "rb")
arq = open('/home/samuel/Área de Trabalho/Desafio/REST-CRUD/membros.csv')

ler = csv.reader(arq)

data = []
for x in ler:
    #print(x)
    data.append(x)
    '''
    db.teste.insert_one({
        "nome": "teste2",
        "idade": 12

    })
    '''
print(data[0])

print(len(data))
for x in range(len(data)):
    #print(data[x][0])
    
    db.teste.insert_one({
        "nome": data[x][0],
        "fone_res": data[x][1],
        "fone_com": data[x][2],
        "celular": data[x][3],
        "endereço": data[x][4],
        "departamento": data[x][5],
    })
    

    
