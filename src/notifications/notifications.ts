import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

/**
 * Configures notification behaviour and asks for the necessary permission.
 */
export const notificationSetup = () => {
  setNotificationHandler();
  return notificationPermissions();
};

/**
 * Configure the behaviour of notifications.
 */
const setNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

/**
 * Ask for the necessary permissions to send notifications to phone.
 */
const notificationPermissions = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return "Failed to get notification permissions!";
    }
    return null;
  }
  return "Must use physical device for Push Notifications";
};

/**
 * Send notification to phone.
 * @param title - Notification title.
 * @param body  - Notification body.
 */
export const sendNotification = async (title: string, body: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: null, // null = schedule for delivery immediately.
  });
};
