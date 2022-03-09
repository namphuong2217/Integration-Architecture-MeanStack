# *Integration Architectures* MEAN Final Results

This template is meant to support students getting started with the Integration Architectures project.

## Final GUI

![NodeJs Website](readme_resources/Final1.png)
![NodeJs Website](readme_resources/Final2.png)
![NodeJs Website](readme_resources/Final3.png)
![NodeJs Website](readme_resources/Final4.png)


## Enterprise Applications OrangeHRM & OpenCRX data
The data above coming from OrangeHRM & OpenCRX servers on the Internet are managed and processed within the MEAN applications.
Suitable authentication mechanisms are applied and integrated accordingly.

 1. **OrangeHRM data**

    ![NodeJs Website](readme_resources/Final5 OrangeHRM.png)
    ![NodeJs Website](readme_resources/Final6 OrangeHRM.png)
    ![NodeJs Website](readme_resources/Final7 OrangeHRM.png)


 2. **OpenCRX data**

    ![NodeJs Website](readme_resources/Final8 OpenCRX.png)
    ![NodeJs Website](readme_resources/Final9 OpenCRX.png)

## Launching the Applications

For both front- and backend there ar run scripts included in their `package.json`.
So you can just start them by running `npm run start` in their respective directories.

After they are done starting, the frontend can be reached from your browser at: http://localhost:4200/
[![Login page of template](readme_resources/login.png)](http://localhost:4200/)
You can log in with username *admin* and the password, which is printed out to the console output of the backend.
<br>**!!! Attention: The password will only be printed out on first startup (e.g. when no user is present in the database). So please write it down!**
In case you forgot that, you can still empty the collection 'user' in the database and restart the backend.

It is possible in IntelliJ or WebStorm, to store these start commands in a convenient way and start your applications at a push of a button.
To do so, select "Add Configuration..." at the upper right of your IntelliJ Window. A window will open, which looks like this:

![startup configuration window](readme_resources/intellij_startup_configs.png)

In that window, you click the plus in the upper left corner and then select "npm" from the dropdown menu. This creates a new run configuration.
On the right of the window, you can give your run configuration a name, like "frontend". Also, you have to select the `package.json`. In this example, the one of the frontend.
Make sure "run" is selected as the command and "start" is selected as the script.
After that, you can save your run configuration and try it out.
These steps have to be repeated for the backend. In this case, obviously selecting the `package.json` of the backend.

### Result

If your Login was successful, you will see this page:

![Login page of template](readme_resources/landing-page.png)