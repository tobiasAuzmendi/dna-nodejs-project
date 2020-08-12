# NodeJS / Express / MongoDB backend application for DNA mutations

**Version 1.0.0**

A NodeJS application developed with Express. With this app, you can ask for mutations on a given NxN DNA sequence. We understand as mutation the fact that more than one four-letter sequence is found equal, obliquely (diagonal), horizontally or vertically in the DNA sequence. This API also exports an endpoint that returns the mutations ratio on the requests made.
In the other hand there is an email module that allows you to send a specific template to an email passed as parameter.

TO DO
 - Separate email template from .ts file.
 - Add unit tests

## Live app

This api is accesible pointing to [tobiasauzmendi.dev/api](https://tobiasauzmendi.dev/api). In this case I used an EC2 Instance of AWS to deploy it.

## App startup

Pre requirements:

MongoDB installation:

Enter to [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/) and follow the corresponding setup steps for your system. After that create a "test" DB.

Once MongoDB is configured and running you can run the app running the following commands on the project root directory:

```
npm install
npm run dev
```

The last command will run the app in [http://localhost:5000](http://localhost:5000).

From the server side the commando to run is

```
npm run prod
```

This last command with use forever library in order to avoid server stops on crashes.

## Testing

To do

## Deployment

To deploy the app you should clone this repo inside a server folder and run the App startup commands.