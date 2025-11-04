

const scriptsInEvents = {

	async Gameplay_Event289_Act12(runtime, localVars)
	{
		// Gets the logged in user, and loads the previous state of the level editor peg layout
		
		runtime.globalVars.CustomerLevelAuthor = localStorage.getItem("user") || "PachinGO!";
		
		const pegDict = JSON.parse(runtime.globalVars.PegData).data;
		
		for (const key in pegDict) {
		    const pegData = JSON.parse(pegDict[key]);
		
		    const newPeg = runtime.objects.Peg.createInstance("Pegs", pegData.x, pegData.y);
		    newPeg.angle = pegData.angle;
		    newPeg.setAnimation(pegData.animation);
		}
	},

	async Gameplay_Event438_Act3(runtime, localVars)
	{
		// Save the peg layout into a JSON
		
		const pegDict = {
		    c2dictionary: true,
		    data: {}
		};
		
		for (const peg of runtime.objects.Peg.getAllInstances()) {
		    const key = "Peg" + peg.uid;
		
		    if(peg.animationName === "CircleBlueActive") peg.setAnimation("CircleBlue");
		    if(peg.animationName === "BrickBlueActive") peg.setAnimation("BrickBlue");
		    if(peg.animationName === "CurveBlueActive") peg.setAnimation("CurveBlue");
		
		    const pegData = {
		        x: peg.x,
		        y: peg.y,
		        angle: peg.angle,
		        animation: peg.animationName
		    };
		
		    pegDict.data[key] = JSON.stringify(pegData);
		}
		
		runtime.globalVars.PegData = JSON.stringify(pegDict);
	},

	async Gameplay_Event449_Act4(runtime, localVars)
	{
		// Save the peg layout into a JSON
		
		const pegDict = {
		    c2dictionary: true,
		    data: {}
		};
		
		for (const peg of runtime.objects.Peg.getAllInstances()) {
		    const key = "Peg" + peg.uid;
		
		    if(peg.animationName === "CircleBlueActive") peg.setAnimation("CircleBlue");
		    if(peg.animationName === "BrickBlueActive") peg.setAnimation("BrickBlue");
		    if(peg.animationName === "CurveBlueActive") peg.setAnimation("CurveBlue");
		
		    const pegData = {
		        x: peg.x,
		        y: peg.y,
		        angle: peg.angle,
		        animation: peg.animationName
		    };
		
		    pegDict.data[key] = JSON.stringify(pegData);
		}
		
		runtime.globalVars.PegData = JSON.stringify(pegDict);
	},

	async Gameplay_Event449_Act5(runtime, localVars)
	{
const pegs = JSON.parse(runtime.globalVars.PegData).data;

const upload = async () => { 
    const formData = new FormData();

    formData.append("name", runtime.globalVars.CustomLevelName || "Custom Level");
    formData.append("author", localStorage.getItem("user"));
    formData.append("desc", runtime.globalVars.CustomLevelDesc || "This level is so fun!");
    formData.append("pegLayout", runtime.globalVars.PegData);
    formData.append("numOrange", runtime.globalVars.NumberOfOrangePegsInLevel);
    formData.append("backgroundImageOpacity", runtime.globalVars.BGIMageOpacity);
    formData.append("backgroundImageHSL", JSON.stringify({"H": runtime.globalVars.HBGColor, "S": runtime.globalVars.SBGColor, "L": runtime.globalVars.SBGColor}));
    formData.append("musicSelect", runtime.globalVars.MusicSelect);

    const backgroundPicker = runtime.objects.ImageHere;
    const musicPicker = runtime.objects.MusicHere;

    const backgroundPickerInst = backgroundPicker.getFirstInstance();
    const musicPickerInst = musicPicker.getFirstInstance();

    let backgroundFile = "";
    let musicFile = "";

    if (backgroundPickerInst) backgroundFile = backgroundPickerInst.getFiles()[0];
    if (musicPickerInst) musicFile = musicPickerInst.getFiles()[0];

    if (backgroundFile) {
        formData.append("background", backgroundFile, backgroundFile.name || "background.png");
    }

    if (musicFile) {
        formData.append("music", musicFile, musicFile.name || "music.mp3");
    }

    const res = await fetch(`${runtime.globalVars.BackendURL}/api/v1/level/uploadLevel`, {
    method: "POST",
    mode: "cors",
    body: formData,
    });

    res.ok ? runtime.globalVars.UploadStatus = true : runtime.globalVars.UploadStatus = false;
}

runtime.globalVars.BGIMageOpacity !== 0 ? await upload() : runtime.globalVars.UploadStatus = false;
	},

	async Menu_Event1_Act5(runtime, localVars)
	{

	},

	async Gameplay_Event6_Act37(runtime, localVars)
	{
// Load the level editor peg layout into the
// gameplay test layout

const load = async () => {
    const res = await fetch(`${runtime.globalVars.BackendURL}/api/v1/level/loadLevel?levelID=${localStorage.getItem("levelID")}`, {
    method: "GET",
    mode: "cors",
    });
    
    const data = await res.json();
    const layout = data.level.pegLayout.data;

    for (const key in layout) {
        const pegData = JSON.parse(layout[key]);

        const newPeg = runtime.objects.Peg.createInstance("Pegs", pegData.x, pegData.y);
        newPeg.angle = pegData.angle;
        newPeg.setAnimation(pegData.animation);
    }

    runtime.globalVars.NumberOfOrangePegsInLevel = data.level.numOrange;
    runtime.globalVars.MusicSelect = data.level.musicSelect;
    runtime.globalVars.BGIMageOpacity = data.level.backgroundImageOpacity;
    runtime.globalVars.HBGColor = data.level.backgroundImageHSL.H;
    runtime.globalVars.SBGColor = data.level.backgroundImageHSL.S;
    runtime.globalVars.LBGColor = data.level.backgroundImageHSL.L;
    runtime.callFunction("SetBG", `${runtime.globalVars.R2URL}/${data.level.backgroundImage}`);
    runtime.callFunction("SetMusic", `${runtime.globalVars.R2URL}/${data.level.backgroundMusic}`);
}

if (runtime.layout.name === "Level Editor Play") {
  const dict = JSON.parse(runtime.globalVars.PegData).data;

    for (const key in dict) {
        const pegData = JSON.parse(dict[key]);

        const newPeg = runtime.objects.Peg.createInstance("Pegs", pegData.x, pegData.y);
        newPeg.angle = pegData.angle;
        newPeg.setAnimation(pegData.animation);
    }
}

if (runtime.layout.name === "Level Editor Online") {
    await load();
    const menu = runtime.objects.backtohome.getFirstInstance();
    menu.destroy();
}

	},

	async Menu_Event5_Act1(runtime, localVars)
	{
		localStorage.setItem("layout", "Level Editor Online");
		localStorage.setItem("levelID", 21);
		const layout = localStorage.getItem("layout");
		runtime.callFunction("CheckLayout", layout);
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
