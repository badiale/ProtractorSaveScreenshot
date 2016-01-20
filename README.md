 # Purpose
 
 This repository has the objective to demonstrate a problem that may occur when you save screenshots in protractor.
 If some error occurs, then the process immediately exits, and your screenshot may not be saved.
 
 # Correction
 
 To solve this problem there is a fix on the branch named `correction`. It basically tracks the relevant open streams and
 wait for them to close in the property `afterLaunch` of the protractor configuration. If you know a cleaner solution
 to this problem, feel free to make a pull request.