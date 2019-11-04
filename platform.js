/**
 * Get platform name
 * @return {string}
 */
export default function platform() {
  const { platformName = '' } = driver.capabilities;

  return platformName.toLowerCase();
}
