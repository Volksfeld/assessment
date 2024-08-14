# Yopaki Recruiting

Thank you again for participating in this recruiting process.

Please, follow the instructions and submit your results when ready.

NOTE: This is not a leet code exercise nor a trick question exam.
This is authentically a way to look into each other's minds regarding how we can
collaborate.

## Get started

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Start the app

   ```bash
    pnpm expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
 a blank **app** directory where you can start developing.

# Goals
The current app shows a nice animated carousel. This carousel was obtained from
our collections of resources, ie copy-pasted.

We noticed it has a drawback: it's capped to 4 elements.
I say 'capped' because if you add more, the collapsed cards get very thin.

Your challenges are there:
1. Don't change the package manager: npm is slow and yarn the worst cancer in mobile dev — I'm willing to die on this hill.
2. Make the carousel suitable for more elements.
   1. 4-ish should be displayed at a time but if you scroll left or right you should be able to see the rest.
3. When you double tap a card, the user should be taken to a screen where the card picture is shown along with some more details (lorem ipsum)
4. Remove the dummy data `_data` and use the functions provided in the file `/lib/data.ts`. DO NOT modify this file.

Restrictions:
1. You may install any dependency you want.
   1. If it is not an expo package or react query you should be prepared to justify it (one sentence, not an essay)
2. The data functions are throttled on purpose to see how you would handle cache.
   1. You're free to handle this in whichever way you see fit.
   2. This will be a point of discussion — not an inquisition, there's no right or wrong here, only trade-offs.

Submit as a GitHub repo where you invite the user `carloschida`.
If at any point you have questions, contact me `carlos@yopaki.com`.
