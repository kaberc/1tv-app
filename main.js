const { app, BrowserWindow } = require('electron')

const URL = 'https://static-hbb.1tv.ru/media/stream'

const OPTIONS = {
  width: 1280,
  height: 720,
  useContentSize: true,
  webPreferences: {
    nodeIntegration: true
  }
}


class RatioWindow extends BrowserWindow {
  handleWillResize(event, newSize) {
    event.preventDefault();
    this.setContentSize(newSize.width, parseInt(newSize.width * this.ratio), true)
  }

  constructor() {
    super(OPTIONS)
    this.ratio = OPTIONS.height / OPTIONS.width
    this.on('will-resize', this.handleWillResize)
  }
}

function createWindow () {
  const win = new RatioWindow()

  win.loadURL(URL)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})