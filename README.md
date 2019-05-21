# express-keycloak
Express integration with keycloak

## Prerequisites
Before you try this demo, make sure you have configured Keycloak locally

## Keycloak Local Installation

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


## Import realm configuration 
A realm configuration is already available in git source code with the name 'realm-export.json' 

Login to http://localhost:8080/auth/admin and click 'Add realm' link.
Import the 'realm-export.json' file and hit 'Create' button.

A new realm named 'test' is created with the basic rights,roles and custom theme.

## Create dummy users to test realm 
Create normal user without any custom roles
<br/>
Create a user for role based authentication
<br/>
     Users --> <user> -->Role Mappings --> Client Roles --> test-client --> 'admin'
<br/>     
Create a realm admin user
     <br/>
     Users --> <user> --> Role Mapping --> Realm Roles --> 'admin'
<br/>     
More details --> https://www.keycloak.org/docs/3.3/securing_apps/topics/oidc/nodejs-adapter.html

     

## Run Express Locally
```
npm install
npm start
```
The server starts on http://localhost:3000

<br/>
All loggedin users have access to  http://localhost:3000/profile
<br/>
Only role based authenticated user has access to  http://localhost:3000/admin
<br/>
Only realm based authenticated user has access to  http://localhost:3000/realmadmin

