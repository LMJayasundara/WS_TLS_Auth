openssl req -new -x509 -days 365 -keyout key/server-ca-key.pem -out key/server-ca-crt.pem -passout pass:shan1996 \
-subj "/C=LK/ST=WP/L=CG/O=CG/OU=CG/CN=server.localhost"

openssl genrsa -out key/server-key.pem 4096

openssl req -new -sha256 -key key/server-key.pem -out key/server-csr.pem -passout pass:shan1996 \
-subj "/C=LK/ST=WP/L=CG/O=CG/OU=CG/CN=localhost"

openssl x509 -req -days 365 -in key/server-csr.pem -CA key/server-ca-crt.pem -CAkey key/server-ca-key.pem -CAcreateserial -out key/server-crt.pem

openssl verify -CAfile key/server-ca-crt.pem key/server-crt.pem

openssl req -new -x509 -days 365 -keyout key/client-ca-key.pem -out key/client-ca-crt.pem -passout pass:shan1996 \
-subj "/C=LK/ST=WP/L=CG/O=CG/OU=CG/CN=client.localhost"

openssl genrsa -out key/client-key.pem 4096

openssl req -new -sha256 -key key/client-key.pem -out key/client-csr.pem -passout pass:shan1996 \
-subj "/C=LK/ST=WP/L=CG/O=CG/OU=CG/CN=client"

openssl x509 -req -days 365 -in key/client-csr.pem -CA key/client-ca-crt.pem -CAkey key/client-ca-key.pem -CAcreateserial -out key/client-crt.pem

openssl verify -CAfile key/client-ca-crt.pem key/client-crt.pem