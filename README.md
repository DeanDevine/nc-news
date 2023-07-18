    styling isn't hugely important at this point but it would be good to be able to view the entire image and not have the right side of each article cut off (this is on both mobile and web view)

    try not to let your components get too big, I would split the component with all the articles in into two with the article cards as a child of it

I'm not a fan of this double return. I think it would be better to extract out the article card into it's own component and map through each article to return a card for each one

Although we say CSS at this stage is not important, responsiveness is important and changing the size of the browser, your app is not responsive and does not resize - it would be good to add this in!


    when i post a comment as a user that doesn't exist a 404: Not Found error pops up, it would be nice if this said why i couldn't post i.e not an existing user (in fact like your other errors do! they look good)

    i love that with a slow connection it says 'posting comment' but i can still click the post button resulting in several of the same comment posting when the request goes through - could be nice to disable the post button while it's posting!

    currently the user has to type in an existing user to post, which is only good if they know them!
