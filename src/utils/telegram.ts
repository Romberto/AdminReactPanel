export function loadTelegramWidget(
  botName: string,
  callbackName = 'handleTelegramAuth'
) {
  const s = document.createElement('script')
  s.src = 'https://telegram.org/js/telegram-widget.js?22'
  s.setAttribute('data-telegram-login', botName)
  s.setAttribute('data-size', 'large')
  s.setAttribute('data-onauth', callbackName)
  s.async = true
  document.getElementById('tg-widget-root')?.appendChild(s)
}
