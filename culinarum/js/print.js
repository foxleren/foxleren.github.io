function CallPrint() {
    let content = document.getElementById('print-content')
    let myFrame = document.createElement('IFRAME');
    myFrame.domain = document.domain;
    myFrame.style.position = "absolute";
    myFrame.style.top = "-10000px";
    document.body.appendChild(myFrame);
    myFrame.contentDocument.write(content.innerHTML);
    myFrame.focus();
    myFrame.contentWindow.print();
    myFrame.parentNode.removeChild(myFrame);
    window.focus();
}
