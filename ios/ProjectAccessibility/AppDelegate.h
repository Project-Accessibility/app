#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import "ReactNativeConfig.h"
@import RadarSDK;

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
