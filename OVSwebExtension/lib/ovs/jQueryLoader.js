//let head = document.getElementsByTagName("HEAD")[0];
//let link = document.createElement("link");

// Window and Document Events
// ==========================
$(window).on("beforeunload", function() {
    Unregister();
});
$(window).on("resize", function() {
    UpdateUI();
});
$(window).on("offline", function(){
    console.warn('Offline!');

    $("#regStatus").html(lang.disconnected_from_web_socket);
    $("#WebRtcFailed").show();
});
$(window).on("online", function(){
    console.log('Online!');
    ReconnectTransport();
});
$(document).ready(function () {
    
    // Load phoneOptions
    // =================
    // Note: These options can be defined in the containing HTML page, and simply defined as a global variable
    // var phoneOptions = {} // would work in index.html
    // Even if the setting is defined on the database, these variabled get loaded after.

    let extensionNo;
    extensionNo = GetURLParameter("extension");
    if (typeof extensionNo == "undefined") {
         extensionNo = "1089";
    }
    console.log("extensionNo :" + extensionNo);
    if(extensionNo !="") {
        var phoneOptions = {
            CallRecordingPolicy:"disabled",
            RecordAllCalls:false,
            EnableVideoCalling:true,
            Language:"en",
            AutoAnswerPolicy:"disabled",
            DoNotDisturbPolicy:"disabled",
            CallWaitingPolicy:"disabled",
            DoNotDisturbEnabled:false,
            CallWaitingEnabled:false,
            MaxBuddies:1,
            welcomeScreen:"",
            EnableAccountSettings: false,
            EnableNotificationSettings: false,
            EnableAppearanceSettings: false,
            userAgentStr: "ovs WFONE",
            DoNotDisturbEnabled: false,
            DisableBuddies: true,
            VoiceMailSubscribe: false,
            loadAlternateLang: false,
            profileUser: extensionNo,
            profileName: extensionNo,
            wssServer: "ovsccserver.kozow.com",
            WssInTransport: true,
            WebSocketPort: 8089,
            ServerPath: "/ws",
            SipUsername: extensionNo,
            SipPassword: "ab0000",
            AudioOutputId: "default",
            VideoSrcId: "default",
            VideoHeight: "240",
            FrameRate: "15",
            AspectRatio: "1.33",
            VideoOrientation: "rotateY(180deg)",
            AudioSrcId: "default",
            AutoGainControl: true,
            EchoCancellation: true,
            NoiseSuppression: true,
            RingOutputId: "default",
            Notifications: true,
        };
    }
    var options = (typeof phoneOptions !== 'undefined')? phoneOptions : {};
    if(options.welcomeScreen !== undefined) welcomeScreen = options.welcomeScreen;
    if(options.loadAlternateLang !== undefined) loadAlternateLang = options.loadAlternateLang;
    if(options.profileUser !== undefined) profileUser = options.profileUser;
    if(options.profileName !== undefined) profileName = options.profileName;
    if(options.wssServer !== undefined) wssServer = options.wssServer;
    if(options.WebSocketPort !== undefined) WebSocketPort = options.WebSocketPort;
    if(options.ServerPath !== undefined) ServerPath = options.ServerPath;
    if(options.SipUsername !== undefined) SipUsername = options.SipUsername;
    if(options.SipPassword !== undefined) SipPassword = options.SipPassword;
    if(options.TransportConnectionTimeout !== undefined) TransportConnectionTimeout = options.TransportConnectionTimeout;
    if(options.TransportReconnectionAttempts !== undefined) TransportReconnectionAttempts = options.TransportReconnectionAttempts;
    if(options.TransportReconnectionTimeout !== undefined) TransportReconnectionTimeout = options.TransportReconnectionTimeout;
    if(options.VoiceMailSubscribe !== undefined) VoiceMailSubscribe = options.VoiceMailSubscribe;
    if(options.VoicemailDid !== undefined) VoicemailDid = options.VoicemailDid;
    if(options.userAgentStr !== undefined) userAgentStr = options.userAgentStr;
    if(options.hostingPrefex !== undefined) hostingPrefex = options.hostingPrefex;
    if(options.RegisterExpires !== undefined) RegisterExpires = options.RegisterExpires;
    if(options.WssInTransport !== undefined) WssInTransport = options.WssInTransport;
    if(options.IpInContact !== undefined) IpInContact = options.IpInContact;
    if(options.IceStunServerJson !== undefined) IceStunServerJson = options.IceStunServerJson;
    if(options.IceStunCheckTimeout !== undefined) IceStunCheckTimeout = options.IceStunCheckTimeout;
    if(options.AutoAnswerEnabled !== undefined) AutoAnswerEnabled = options.AutoAnswerEnabled;
    if(options.DoNotDisturbEnabled !== undefined) DoNotDisturbEnabled = options.DoNotDisturbEnabled;
    if(options.CallWaitingEnabled !== undefined) CallWaitingEnabled = options.CallWaitingEnabled;
    if(options.RecordAllCalls !== undefined) RecordAllCalls = options.RecordAllCalls;
    if(options.StartVideoFullScreen !== undefined) StartVideoFullScreen = options.StartVideoFullScreen;
    if(options.SelectRingingLine !== undefined) SelectRingingLine = options.SelectRingingLine;
    if(options.UiMaxWidth !== undefined) UiMaxWidth = options.UiMaxWidth;
    if(options.UiThemeStyle !== undefined) UiThemeStyle = options.UiThemeStyle;
    if(options.UiMessageLayout !== undefined) UiMessageLayout = options.UiMessageLayout;
    if(options.UiCustomConfigMenu !== undefined) UiCustomConfigMenu = options.UiCustomConfigMenu;
    if(options.UiCustomDialButton !== undefined) UiCustomDialButton = options.UiCustomDialButton
    if(options.UiCustomAddBuddy !== undefined) UiCustomAddBuddy = options.UiCustomAddBuddy
    if(options.UiCustomEditBuddy !== undefined) UiCustomEditBuddy = options.UiCustomEditBuddy
    if(options.UiCustomMediaSettings !== undefined) UiCustomMediaSettings = options.UiCustomMediaSettings
    if(options.UiCustomMessageAction !== undefined) UiCustomMessageAction = options.UiCustomMessageAction
    if(options.AutoGainControl !== undefined) AutoGainControl = options.AutoGainControl;
    if(options.EchoCancellation !== undefined) EchoCancellation = options.EchoCancellation;
    if(options.NoiseSuppression !== undefined) NoiseSuppression = options.NoiseSuppression;
    if(options.MirrorVideo !== undefined) MirrorVideo = options.MirrorVideo;
    if(options.maxFrameRate !== undefined) maxFrameRate = options.maxFrameRate;
    if(options.videoHeight !== undefined) videoHeight = options.videoHeight;
    if(options.MaxVideoBandwidth !== undefined) MaxVideoBandwidth = options.MaxVideoBandwidth;
    if(options.videoAspectRatio !== undefined) videoAspectRatio = options.videoAspectRatio;
    if(options.NotificationsActive !== undefined) NotificationsActive = options.NotificationsActive;
    if(options.StreamBuffer !== undefined) StreamBuffer = options.StreamBuffer;
    if(options.PosterJpegQuality !== undefined) PosterJpegQuality = options.PosterJpegQuality;
    if(options.VideoResampleSize !== undefined) VideoResampleSize = options.VideoResampleSize;
    if(options.RecordingVideoSize !== undefined) RecordingVideoSize = options.RecordingVideoSize;
    if(options.RecordingVideoFps !== undefined) RecordingVideoFps = options.RecordingVideoFps;
    if(options.RecordingLayout !== undefined) RecordingLayout = options.RecordingLayout;
    if(options.DidLength !== undefined) DidLength = options.DidLength;
    if(options.MaxDidLength !== undefined) MaxDidLength = options.MaxDidLength;
    if(options.DisplayDateFormat !== undefined) DisplayDateFormat = options.DisplayDateFormat;
    if(options.DisplayTimeFormat !== undefined) DisplayTimeFormat = options.DisplayTimeFormat;
    if(options.Language !== undefined) Language = options.Language;
    if(options.EnableTextMessaging !== undefined) EnableTextMessaging = options.EnableTextMessaging;
    if(options.DisableFreeDial !== undefined) DisableFreeDial = options.DisableFreeDial;
    if(options.DisableBuddies !== undefined) DisableBuddies = options.DisableBuddies;
    if(options.EnableTransfer !== undefined) EnableTransfer = options.EnableTransfer;
    if(options.EnableConference !== undefined) EnableConference = options.EnableConference;
    if(options.AutoAnswerPolicy !== undefined) AutoAnswerPolicy = options.AutoAnswerPolicy;
    if(options.DoNotDisturbPolicy !== undefined) DoNotDisturbPolicy = options.DoNotDisturbPolicy;
    if(options.CallWaitingPolicy !== undefined) CallWaitingPolicy = options.CallWaitingPolicy;
    if(options.CallRecordingPolicy !== undefined) CallRecordingPolicy = options.CallRecordingPolicy;
    if(options.IntercomPolicy !== undefined) IntercomPolicy = options.IntercomPolicy;
    if(options.EnableAccountSettings !== undefined) EnableAccountSettings = options.EnableAccountSettings;
    if(options.EnableAppearanceSettings !== undefined) EnableAppearanceSettings = options.EnableAppearanceSettings;
    if(options.EnableNotificationSettings !== undefined) EnableNotificationSettings = options.EnableNotificationSettings;
    if(options.EnableAlphanumericDial !== undefined) EnableAlphanumericDial = options.EnableAlphanumericDial;
    if(options.EnableVideoCalling !== undefined) EnableVideoCalling = options.EnableVideoCalling;
    if(options.EnableTextExpressions !== undefined) EnableTextExpressions = options.EnableTextExpressions;
    if(options.EnableTextDictate !== undefined) EnableTextDictate = options.EnableTextDictate;
    if(options.EnableRingtone !== undefined) EnableRingtone = options.EnableRingtone;
    if(options.MaxBuddies !== undefined) MaxBuddies = options.MaxBuddies;
    if(options.MaxBuddyAge !== undefined) MaxBuddyAge = options.MaxBuddyAge;
    if(options.ChatEngine !== undefined) ChatEngine = options.ChatEngine;
    if(options.XmppDomain !== undefined) XmppDomain = options.XmppDomain;
    if(options.XmppServer !== undefined) XmppServer = options.XmppServer;
    if(options.XmppWebsocketPort !== undefined) XmppWebsocketPort = options.XmppWebsocketPort;
    if(options.XmppWebsocketPath !== undefined) XmppWebsocketPath = options.XmppWebsocketPath;
    if(options.XmppRealm !== undefined) XmppRealm = options.XmppRealm;
    if(options.XmppRealmSeperator !== undefined) XmppRealmSeperator = options.XmppRealmSeperator;
    if(options.XmppChatGroupService !== undefined) XmppChatGroupService = options.XmppChatGroupService;

    console.log("Runtime options", options);

    // Load Langauge File
    // ==================
    $.getJSON(hostingPrefex + "lang/en.json", function(data){
        lang = data;
        console.log("English Lanaguage Pack loaded: ", lang);
        if(loadAlternateLang == true){
            var userLang = GetAlternateLanguage();
            if(userLang != ""){
                console.log("Loading Alternate Lanaguage Pack: ", userLang);
                $.getJSON(hostingPrefex +"lang/"+ userLang +".json", function (altdata){
                    lang = altdata;
                }).always(function() {
                    console.log("Alternate Lanaguage Pack loaded: ", lang);
                    InitUi();
                });
            }
            else {
                console.log("No Alternate Lanaguage Found.");
                InitUi();
            }
        }
        else {
            InitUi();
        }
    });
});
if(window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e){
        console.log(`Changed system Theme to: ${e.matches ? "dark" : "light"} mode`)
        ApplyThemeColor()
    });
}