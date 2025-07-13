<!-- TODO: *** Setting up the backend in backend folder *** -->

********\*\*\********* Setup & Product Routing ********\*\*\*********

1. set Server settings (_Server.js_,_App.js_)

2. add additional things in Scripts in package.json file ==>
   "start":"node backend/Server.js", // for server starting at production time
   "dev":"nodemon backend/Server.js" // Automatically server starting for development time

3. Add "controller" & "routes" folders and related files for controlling the routes

4. import all routes in App.js file

5. Connect MongoDB with Server, Create _Mydatabase.js_ (You can give him any file_name) in config folder

6. import _connectDatabase()_ from _Mydatabase.js_ file and call it after _dotenv.config_ line

7. Start Making Product Api's now, means _Product Model or Product Schema_, So create folder "models" and "ProductModel.js" file into it, after it import it in "ProductController.js" then "createProduct" there and then import it in "ProductRoute"

8. Till Now we build CRUD Apis of product, and also test them.

********\*\*\********* Error Handling For Backend ********\*\*\*********
Q: Why we need it ?
Ans: look we have to set the condition (once yaani 1 bar) for error handling in just one file, and we can use it everywhere for same errors.
doing this, we don't need to set same condition again and again in file. it will handle backend error itself.

9. 1st type error _("ErrorHandler")_: Make folder for it _utils_ in backend folder and "ErrorHandler" file into it, We set their "class" for settlement of errors and import it in "middleware" folder _error.js_ file, and after that finally we set the _Middleware for Error_ in app.js file

10. Now we are replacing _ErrorHandler_ with others if else condition for specific error in _ProductController_ file

11. 2nd type error _("catchAsyncErrors")_: Now We shall also set enviroment for _async_ error handling, because it is said whenever you used _async_ then you should must use "try-catch" b/c it is good practice

12. Create file _catchAsyncErrors_ and wrap async functions with it in _ProductController_ file like _catchAsyncErrors(async ()=>{})_

13. 3rd type error _("unhandled promise rejection")_: There is also an error exist, suppose if we change string in "config.env" file, so here we also hand;e this error
    this type of error called _unhandled promise rejection_, and it is related to "MongoDB" connection
    such as: _Connection Error is: MongoParseError: Invalid connection string_ in this case our server didn't crash completely,
    So we have to crash our server completely in this case, taky insult na ho hamari(hahahaha)

14. so, goto _Server.js_ file at the very bottom and create the logic code for shutting down the server.

15. 4th type error (unCaught Error): It occurs when we use that variable which is not defined!

16. For it goto _Server.js_ file at the very top

17. 5th type error (MongoDB Error => Cast to ObjectId failed for value \"66255de2cb2dde\"): It occurs when we give the id inappropriate means uncomplete for getting specific product

18. So, goto _error.js_ file and create logic there "Wrong MongoDB id Error"

   <!-- TODO: *** Search, Filter & Pagination at backend side *** -->

                    <!-- TODO: *** Search *** -->

19. Make file in _utils_ with name _ApiFeatures.js_, where we define the class for searching and import it in _ProductController.js_ file

20. Make _searchItem()_ function in _ApiFeatures.js_, for searching and called it in _ProductController.js_ file right after new object creation of class _ApiFeatures(Product.find(), req.query)_

21. Now test it on Postman giving _keyword and value_ using params option there, After Confirm move on

                <!-- TODO: *** Filter *** -->

22. Make _filterByCategory()_ function in _ApiFeatures.js_, for Filering and called it in _ProductController.js_ file right after new object creation of class _ApiFeatures(Product.find(), req.query)_

23. Now in _filterByCategory()_ function we also apply the Filtering system by _Price and Rating_ also, using this approach we can filter products base on price and rating, and checked on postman
                <!-- TODO: *** Pagenation *** -->

Now we also apply the pagenation to set limited count of items on page,

23. Now in _ApiFeatures_ class we also apply pagenation system by defining _pagenation_ function

24. define _ItemsPerPage_ variable in _ProductController.js_ file in _getAllProducts_ function, and pass it in pagenation function as argument where _pagenation_ function in _ProductController.js_ is called !

         <!-- TODO: *** Authentication Admin Routes (User & Password Authentication) *** -->


25. first in _models_ folder we have to make "UserModels" file with name _UserModels.js_ where user model would be defined

26. After it, in _controllers_ folder we shall define the Controller with file name _UserController.js_, where user would be controlled

27. then finally, in "routes" folder we set the User routes in _UserRoutes.js_ file,

28. And in _utils_ folder we also define the jwtToken function in _jwtToken.js_ file to send the jwt token where it is reuired

29. Now we are going to implement a user that would access the specific actions or items when he would logged in, So make file with name _auth.js_ in middleware folder

30. In (UserController, UserModels, UserRoutes) we implement there 29 point,still here we set the law for loginUser(a user can be anyone) to do somthing in just mentioned routed in _ProductRoutes.js_ file, but now we are going to implement for Admin, means what what the Admin can do?

31. we define the function _authorizedRole(admin)_ in _auth.js_ file to set which autrized things we want to assign to user with _userRole_ => _admin_, (create product, delete , update etc), and set it in ProductRoutes

32. So, Now if you have partners with _userRole_ admin, then it is necessary to know which admin created the product, so we have to pass that id of admin who created the product in new product created object

33. We passed the the _user id_ in new created "product" object by creating new property "user" in _ProductModel_ and setting it before sending the request of creating the product in _ProductController.js_ file

                      <!-- TODO: *** Reset password Token *** -->

34. in _userModel.js_ file make function _getResetPasswordToken_ for Password Reset, and sending the token through _Node Mailor_

35. in _userController.js_ file make function of _forgotPassword_, in this we have to find the _user_ from _database_ using his/her email, and then we get the _reset Token_ by calling the _getResetPasswordToken_ function, and save it.

36. After this, we have to prepare the link using _NodeMailor_, which has to be sent at the email for _password reset_, and options, means required structure information for sending email such as (email, subject, message) etc.

37. Then we have to make function _sendEmail_ in utils _sendEmail.js_ file, and there we set the _all Credentials_ and configurations to send email, most important is that use _App password_ of that email which is set _from_ section, means from which person email has to be sent, email of that person.

38. After testing it on postman, our email is sending successfully, Now we have obtained our _Reset Password Token_ , and now we will make _request_ on this token to proceed, so we shall make method for it.

39. Ofcourse we shall get this link from URL bar means from params, And we shall _hash_ it first after getting from params. and then we shall find the _user_ from _mongoDb_ database, and change its password with requested password, and save it, then also loggedin the user at the same by calling the function _sendToken_ function. Now we shall set its route path also for its utilization. and then check it in postman

40. Now one thing is remaining, if user try to _register_ with the _same email_ again, then he get the message unusual, So we have to set the response message to understand in a better way. So, goto folder _middleware_ in _error.js_ file: and set there the logic for duplication email registeration.

41. Till here we have _completed_ the _Backend User Authentication_ in all cases

                         <!-- TODO: *** Backend User Routes Api's Start*** -->

    **_Means If user want to check his profile info, update it or password Update etc_**

42. Here we shall make function "getUserDetails" to get user details and set the route in userRoutes (for logged in user)

43. After this we shall make function "UpdatePassword" to update user password and set the route in userRoutes (for logged in user)

44. Now we make function _UpdateProfile_ for update the user Profile (all information except password) and set the route in _userRoutes_

    **_Handover the authority to Admin to take action over "Users and Products" also_**

Means we add the _admin_ word in api of create new,update,delete product, which means only admin can do this.

45. We make functions like _UpdateUserRole_ and _DeleteUser_ and set their route paths in _UserRoutes.js_ file and this action only can do the Admin, means Only through Admin

**_Make function that any user can (add,update) the Reviews of products and Avergae of all reviews_**

46. Make functions _creatProductReview, getAllProductReviews, deleteUserReviews_ in _ProductController.js_ file and set their routes in _ProductRoutes.js_ and finally done.

                      <!-- TODO: *** Backend User Routes Api's End*** -->

              <!-- TODO: *** Backend Controller Order Api's Start*** -->


























