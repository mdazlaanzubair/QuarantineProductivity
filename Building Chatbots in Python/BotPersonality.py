# importing time module to add a delay in bot response to
# make it look more like real chat and importing random module
# to select choices randomly
import random, time

# template of responses
bot_template = "Bot: {}"
user_template = "User: {}"

# adding personality to a bot is like making them self answerable
# to achieve this functionality we have to provide a set of responses
# from which a bot can reply to a user

# creating a dictionary of responses
responses = {
    "who are you?": "I am a chat-bot!",
    "what's your name?": "I am a Andy! an you?"
}

# creating a dictionary of multiple responses for one message
multi_responses = {
    "what's your name?": [
                            "I am a Andy! and you?",
                            "My name is Andy.",
                            "Myself Andy.",
                            "They call me Andy.",
                            "You can call me Andy.",
                         ],
    "what's the weather today?": [
                                    "It's sunny today.",
                                    "Sun is on it's peak.",
                                    "Today is hot.",
                                 ]
}


# the problem with this bot is that user have to ask same questions
# which are stored in the dictionary otherwise bot will not reply
def chatBotOne(message):

    print(user_template.format(message))

    # adding delay in bot response
    time.sleep(0.5)

    # getting response and sending to user
    if message in responses:
        print(bot_template.format(responses[message]))


# above chat bot return same answer of one question here in this we can
# respond in multiple ways although problem is still the same that
# user have to ask same questions which are stored in the dictionary
# otherwise bot will not reply but we have variety answers to make the chat
# more engaging
def chatBotTwo(message):

    print(user_template.format(message))

    # adding delay in bot response
    time.sleep(0.5)

    # getting response and sending to user
    if message in multi_responses:
        bot_response = random.choice(multi_responses[message])
        print(bot_template.format(bot_response))


message = input("Your message here: ")

print()
# chatBotOne(message.lower())
chatBotTwo(message.lower())


# in both the cases we are relying on the user message, need more flexible approach :/
