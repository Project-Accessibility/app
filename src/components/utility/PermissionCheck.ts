import { check, request, RESULTS } from 'react-native-permissions';

class PermissionCheck {
  public checkPermission(permissions: any) {
    check(permissions)
      .then(async (result) => {
        await request(permissions);
        if (result !== RESULTS.GRANTED) {
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
const permissionCheck = new PermissionCheck();
export default permissionCheck;
