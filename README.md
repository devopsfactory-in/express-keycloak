# express-keycloak
Express integration with keycloak

## Prerequisites
Before you try this demo, make sure you have configured Keycloak locall

Local Installation

If you are using Docker then it is good to use the Keycloak docker image to run the instance locally.  

```
docker pull jboss/keycloak
```

You can find more details here https://hub.docker.com/r/jboss/keycloak/

Otherwise unzip keycloak-6.0.1.zip and run standalone.bat or standalone.sh depending on your OS

```
...\bin\standalone.bat
```
After the server boots, open http://localhost:8080/auth in your web browser and enter a username and password to create an initial admin user.
