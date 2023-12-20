# Clicker Game 👇

![hero](https://github.com/anav5704/Clicker-Firebase/blob/main/docs/clicker-firebase.png)

This is a simple button clicker game made using Firebase real-time. Users can login/register using Firebase auth and then click to earn points and upgrade to better buttons. There is also a real-time leaderboards that update when users save their scores. Also pleae don't use Firebase. It's okay if you want to give it a try but trust me [Supabase](https://supabase.com) is way better in every way - and it's open source.

## Technologies Used

- Astro JS
- TailwindCSS
- Fiirebase
 
## Getting Started

First fork and clone the repo. First run ```npm install``` to download all the dependencies. Now add the Firebase config in ```src/firebase/client.ts``` using the information provided in your Firebase porject console:

```
const firebaseConfig = {
        apiKey: "___",
        authDomain: "___",
        projectId: "___",
        storageBucket: "___",
        messagingSenderId: "___",
        appId: "___"
};
```

Once that is done, run ```npm start``` to view it on localhost.
    
## Learning Resources

- [Firebase crash course](https://youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb&si=ZE3FOb1aylgg2IjJ)
- [Firebae in 100 seconds](https://www.youtube.com/watch?v=vAoB4VbhRzM)
- [Firebase docs](https://firebase.google.com)
