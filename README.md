# GIPHYAPI
Northwestern Coding Bootcamp Spring 2018 Homework Assignment Week06: GIPHY API

#Requirements
Instructions
Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
We chose animals for our theme, but you can make a list to your own liking.
Your app should take the topics in this array and create buttons in your HTML.
Try using a loop that appends a button for each string in the array.
When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
Under every gif, display its rating (PG, G, so on).
This data is provided by the GIPHY API.
Only once you get images displaying with button presses should you move on to the next step.
Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.
Deploy your assignment to Github Pages.
Rejoice! You just made something really cool.

#Minimum Requirements
Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

#Bonus Goals
Ensure your app is fully mobile responsive.
Allow users to request additional gifs to be added to the page.
Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.
List additional metadata (title, tags, etc) for each gif in a clean and readable format.
Include a 1-click download button for each gif, this should work across device types.
Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio
Allow users to add their favorite gifs to a favorites section.
This should persist even when they select or add a new topic.
If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies).

#Outstanding issues
Need to address floats of the images and add CSS to make the page stylized. <--Resolved by adding flexbox
Download link is not allowing the user to actually download the GIF.

#Author
Ryan Oliver Sotto

# https://ryanoliversotto.github.io/GIPHYAPI.LocalStorage/