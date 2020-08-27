const functions = require('firebase-functions');
const admin = require('firebase-admin') // requiring a package firebase-admin
admin.initializeApp(); // initialize this app server-side

/**
 * A function that would add an admin role to a specific user.
 * onCall means we'll be able to call this function from the frontend
 * data: includes any custom data that we send along with this call to the function which in our case could
 * be the email of the user that we want to make an admin
 * context: includes info about authentication of the user's that's made this call to the function.
 * 
 * Getting user based on the email we send along, then w/ that user we set a custom user claim to that user and the claim is 
 * admin: true
 */
exports.addAdminRole = functions.https.onCall((data, context) => {
    // Check request is made by an admin ~ commented out if you want to have the first person put as admin then deploy again
    if (context.auth.token.admin !== true) {
        return { error: 'Only admins can add other admins' }
    }

    // Get user & add custom claim (admin): when we call the function, we will send an email property together with the data & access it here
    // We are returning this bcz it's gonna return a promise & overall inside that promise at some point we want to 
    // return a value & that value is gonna be returned to the user
    // So if we're returning something inside this promise, we need to return the promise itself to return the overall value
    return admin.auth().getUserByEmail(data.email)
        .then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                // this object represent the different claims we want to add to the user. We want to add just one: admin
                admin: true
            })
        })
        .then(() => {
            // Return a response to the user to the frontend
            return {
                message: `Success! ${data.email} has been made an admin`
            }
        }).catch(err => {
            return err;
        });
});

// We deploy the functions only using firebase deploy --only functions ~ we check the functions tab in our Firebase project and see our first cloud function deployed