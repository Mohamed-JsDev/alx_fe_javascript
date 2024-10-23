document.addEventListener("DOMContentLoaded", function () {
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory"); // Updated ID
  const btnAddQuote = document.getElementById("btnAddQuote");
  const showNewQuote = document.getElementById("newQuote");
  const quoteDisplay = document.getElementById("quoteDisplay");
  const data = {
    work: [
      "I used to work at a stationery store.  But, I didn't feel like I was going anywhere.",
      "So, I got a job at a travel agency.  Now, I know I'll be going places.",
      "I used to work for a soft drink can crusher. It was soda pressing.",
      "I knew I shouldn't steal a mixer from work, but it was a whisk I was willing to take.",
      "I used to work in a shoe recycling shop. It was sole destroying.",
      "I couldn't figure out how the seat belt worked. Then it just clicked.",
      "Why did the worker get fired from the orange juice factory? Lack of concentration.",
      "Want to hear a joke about construction? Nah, I'm still working on it.",
      "Don’t interrupt someone working intently on a puzzle. Chances are, you’ll hear some crosswords.",
    ],
    live: [
      "Why do fish live in salt water? Because pepper makes them sneeze!",
      "Why are fish so smart? Because they live in schools!",
      "What kind of dog lives in a particle accelerator? A Fermilabrador Retriever.",
      "What do you call a bee that lives in America? A USB.",
      "Why do fish live in salt water? Because pepper makes them sneeze!",
      "Why are fish so smart? Because they live in schools!",
      "What kind of dog lives in a particle accelerator? A Fermilabrador Retriever.",
      "What do you call a bee that lives in America? A USB.",
      "Why do fish live in salt water? Because pepper makes them sneeze!",
      "Why are fish so smart? Because they live in schools!",
      "What kind of dog lives in a particle accelerator? A Fermilabrador Retriever.",
      "What do you call a bee that lives in America? A USB.",
    ],
    sleep: [
      "If a child refuses to sleep during nap time, are they guilty of resisting a rest?",
      "How do you get a baby alien to sleep?  You rocket.",
      "What has a bed that you can’t sleep in? A river.",
      "Why did the man run around his bed? Because he was trying to catch up on his sleep!",
      "What kind of dinosaur loves to sleep? A stega-snore-us.",
      "I am so good at sleeping I can do it with my eyes closed!",
    ],
    wife: [
      " Wife told me to take the spider out instead of killing it... We had some drinks, cool guy, wants to be a web developer.",
      "My wife is on a tropical fruit diet, the house is full of stuff. It is enough to make a mango crazy.",
      "It's difficult to say what my wife does, she sells sea shells by the sea shore.",
      "The other day, my wife asked me to pass her lipstick but I accidentally passed her a glue stick. She still isn't talking to me.",
      "When my wife told me to stop impersonating a flamingo, I had to put my foot down.",
      "For Valentine's day, I decided to get my wife some beads for an abacus.  It's the little things that count.",
      "My wife told me to rub the herbs on the meat for better flavor. That's sage advice.",
      "I thought my wife was joking when she said she'd leave me if I didn't stop signing I'm A Believer... Then I saw her face.",
      "My wife said I was immature. So I told her to get out of my fort.",
    ],
  };
  console.log();

  btnAddQuote.onclick = function () {
    const text = newQuoteText.value;
    const category = newQuoteCategory.value.trim();
    switch (category) {
      case "work":
        data.work.push(text);
        console.log("joke added done");

        break;
      case "live":
        data.live.push(text);
        console.log("joke added done");

        break;
      case "sleep":
        data.sleep.push(text);
        console.log("joke added done");

        break;
      case "wife":
        data.wife.push(text);
        console.log("joke added done");

        break;
      default:
        data[category] = [text];
    }
  };
  showNewQuote.onclick = function () {
    const num = Math.floor(Math.random() * 4);
    const num2 = Math.floor(Math.random() * 10);
    if (num === 0) {
      quoteDisplay.innerHTML = data.work[num2];
      console.log(data.work[num2]);
    } else if (num === 1) {
      quoteDisplay.innerHTML = data.live[num2];
      console.log(data.live[num2]);
    } else if (num === 2) {
      quoteDisplay.innerHTML = data.sleep[num2];
      console.log(data.sleep[num2]);
    } else if (num === 3) {
      quoteDisplay.innerHTML = data.wife[num2];
      console.log(data.wife[num2]);
    } else {
      console.log("category is not defiend ");
    }
  };
});
