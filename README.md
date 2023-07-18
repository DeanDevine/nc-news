    styling isn't hugely important at this point but it would be good to be able to view the entire image and not have the right side of each article cut off (this is on both mobile and web view)

    try not to let your components get too big, I would split the component with all the articles in into two with the article cards as a child of it

I'm not a fan of this double return. I think it would be better to extract out the article card into it's own component and map through each article to return a card for each one

Although we say CSS at this stage is not important, responsiveness is important and changing the size of the browser, your app is not responsive and does not resize - it would be good to add this in!
