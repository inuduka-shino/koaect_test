#!/bin/sh
mkdir keys;cd keys
openssl version
openssl genrsa -aes128 1024 > server.key
openssl req -new -key server.key > server.csr
openssl x509 -in server.csr -days 365 -req -signkey server.key > server.crt
openssl rsa -in server.key -out decrypt_server.key
