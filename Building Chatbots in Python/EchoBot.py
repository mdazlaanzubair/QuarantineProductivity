# importing time module to add a delay in bot response to
# make it look more like real chat
import time

# template of responses
bot_template = "Bot: {}"
user_template = "User: {}"


# echo bot are bot which just return what they receive
def echoChatBot(message):
    print(user_template.format(message))

    # adding delay in bot response
    time.sleep(0.5)
    print(bot_template.format(message))


message = input("Your message here: ")
echoChatBot(message)
