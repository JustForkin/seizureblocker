# Seizure Blocker

This is a chrome extension that helps people with photosensitive epilepsy browse the web without risking having a seizure from an animated GIF

# Installation

1) Clone the repo

2) Open Google Chrome and type 'chrome://extensions/' in the search bar

3) Click on 'Load unpacked' in the top left corner and select the folder of the repo

# Contributing

After following the installation instructions and changing things, open a pull request

# Join the private Slack group

You can join this Slack group by clicking on this invite link (https://join.slack.com/t/seizureblocker/shared_invite/enQtNDg2MTc4ODQzMTcwLWIxYzYxODIzNjhjZjY2MmQzNzBlN2JiODUzN2VlZTQxOWZiMmMyYzhiYjM1ZWJkYzk1OWEyMjhlNDdhZmJkMmE)

# Back Story

My girlfriend has photosensitive epilepsy. One day I was casually scrolling through Twitter and found this article (https://www.telegraph.co.uk/technology/2017/03/22/gif-counts-deadly-weapon-seizure-inducing-tweet-case-grand/) about a person who had a seizure from a GIF on Twitter. I checked to see if there is anything out there that can keep epileptic people safe but found nothing. So I decided to create it myself.

# What I envision building

A chrome extension that analyzes GIFs in real time and if they are dangerous, disable them, or slow them down

# What I have built so far

So far, I have made the chrome extension slow down all .gif files to 3 frames per second

# What makes a GIF, or any content on a website dangerous?

According to W3C, the main international standards organization for the World Wide Web, there are two different levels of safety, ‘A’ and ‘AAA’.

‘A’ means that no area bigger than a 20x20 pixel flashes more than three times per second with a great enough contrast.

‘AAA’ means that anything, even a single pixel should flash more than three times per second with a great enough contrast.

Analyzing a GIF pixel by pixel, frame by frame can be crazy. For a small GIF, 300x300 pixels with 50 frames you need to do 4.5 million calculations to check if it's dangerous (worst case scenario)

I hope we can find an efficient solution

Source: https://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure-does-not-violate.html


# Public Roadmap

1) Identify animated content on a webpage

For example, some .gif or .webp files are static, others are animated. As of now, we just get all the .gif files without checking if they are animated

2) Check if the animated content passes the 'A' or 'AAA' criterion. If not, disable it (or slow it down)

