# Expenso
## Application to control expenses

##  To run front-end locally
* Install the Angular CLI globally:
  * `sudo npm install -g @angular/cli`
*Install required dependencies
  * `npm install`
* Start frontend:
  * `ng serve`
  * Go to http://localhost:4200/
  
  ## To run back-end locally
  * configure postgresql
  * cd backend
  * python3 -m venv venv
  * source venv/bnin/activate
  * pip install -r requirements.txt
  * cd src
  * ./manage.py migrate
  * ./manage.py runserver
