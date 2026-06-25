---
title: PowerShell Escape Room
authors:
  - James Petty
date: "2023-09-15T16:42:26+00:00"
categories:
  - DevOps
  - PowerShell for Admins
tags:
  - Fun
  - Projects
aliases:
  - /2023/09/powershell-escape-room/
---

# PowerShell Escape Room by Michiel Hamers

by Michiel Hamers  
<https://about.me/michielhamers/>

## Why on earth you want to create an Escape Room with PowerShell as backend?

I've always been a fan of escape rooms, so I decided to create my own for my kids. I wanted to make it something that would be challenging and fun for them, but also educational. I decided to use PowerShell as the backend for the escape room, as I'm a PowerShell developer and I thought it would be a great way to learn more about the language.  
The first step was to design the rooms. I wanted to make sure that there were a variety of puzzles and challenges that my kids would have to solve. I also wanted to make sure that the rooms were visually appealing and engaging. Once I had the rooms designed, I started building them.  
I used a variety of materials to build the rooms, including wood, cardboard, and fabric. I also used a few electronic components, such as a USB extension cable with a switch and a 3-button keyboard. The USB extension cable with a switch was used to create a physical button that my kids could press to solve one of the puzzles. The 3-button keyboard was used to enter the code that my kids had to find to solve another puzzle.  
I also used a few websites to create rebus puzzles that my kids had to solve. I printed out the rebus puzzles and placed them around the rooms. Once my kids had solved all of the puzzles, they were able to enter the code on a single screen to escape the room.  
In this blog post, we'll delve into the process of creating an engaging PowerShell escape room for the global PowerShell community. We'll emphasize the significance of storytelling and provide a detailed breakdown of the PowerShell structure used for the escape room.

## The Power of Storytelling:

"Story is everything." This principle underpins the foundation of a successful escape room. Crafting an engaging and immersive story is crucial to captivate the participants and provide them with a memorable experience. For the PowerShell escape room, we'll design a narrative that centers around a critical mission, where participants must apply their PowerShell skills to overcome a series of challenges.

## The PowerShell Escape Room Structure:

  1. The Controller - A Hub of Configuration: At the core of the escape room lies the "controller" PowerShell script. Acting as a central hub, this script offers menu options to configure various aspects of the escape room. From the number of rooms to the puzzles in each room and available hints, the controller script dynamically generates JSON files for each screen.
  2. The Screen Scripts - Immersive Interaction: To create an interactive environment, individual PowerShell scripts are designated for each screen within the setup. Approximately nine screens are utilized, each responsible for a unique role. Upon startup, the screen script prompts the user to enter a screen number, enabling customized content based on the corresponding JSON configuration.
  3. JSON Files for Puzzle Management: The puzzles, solutions, and hints are efficiently managed using JSON files. Quest files house the puzzles or rebus challenges, while hints are stored in separate JSON files, indicating the puzzle they refer to and the number of times they can be accessed.
  4. Game State Management: To monitor the progress of the players and provide a seamless experience, a game state JSON file is employed. It keeps track of the number of completed rooms, solved puzzles, and hints used by the players. By resetting to a default template, the game state is restored whenever a reset is initiated.
  5. Physical and Virtual Elements: To cater to a global audience, we'll blend physical and virtual elements in the escape room. Participants can interact with the virtual challenges via an online platform while engaging with tangible components, such as specially designed 3-key keyboards, for input on certain screens.

## Conclusion:

Creating the PowerShell escape room for my kids was an incredibly rewarding experience. As a PowerShell developer, I wanted to share my passion for the language in a fun and educational way. Watching my kids immerse themselves in the challenges, applying their problem-solving skills and learning more about PowerShell, filled me with joy.  
If you're considering creating your own PowerShell escape room, here are a few tips based on my experience:

  1. Make sure that the puzzles are both challenging and enjoyable, with an educational twist to enhance the learning experience.
  2. Utilize a variety of materials to build the rooms, creating visually appealing and immersive environments.
  3. Incorporate electronic components to add an interactive dimension to the escape room, making it even more engaging.
  4. Explore websites to craft intriguing rebus puzzles that will intrigue and challenge your participants.
  5. Print out the rebus puzzles and strategically place them around the rooms to ensure an exciting and dynamic gameplay.
  6. Ensure that the code or answers your participants need to progress are cleverly hidden yet not overly difficult to find.  
    Lastly, I'm eager to connect with fellow enthusiasts who have also ventured into the world of PowerShell escape rooms or any other unique application of PowerShell. Let's share our experiences, ideas, and insights to create more thrilling adventures that celebrate our love for PowerShell and foster a strong community of like-minded individuals.

Together, let's continue exploring the endless possibilities of PowerShell and inspire others to embrace its power and potential.  
![file](https://powershell.org/wp-content/uploads/2023/09/image-1694796121959.png)
