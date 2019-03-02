
function cityCircleMouseover(event) {
    console.log('mouseover')
    event.setAttribute('r', +event.getAttribute('r') * 5.0 / 4.0)
    showPopover(event)
}

function cityCircleMouseout(event) {
    event.setAttribute('r', +event.getAttribute('r') * 4.0 / 5.0)
    // hidePopover()
}

function cityCircleClick (event) {
    console.log('click ', event)
    showPopover(event)
}

function showPopover(circle) {
    hidePopover()

    let foreign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
    foreign.className += "map-popover-foreignobject"

    let triangle = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')

    let fontFamily = window.getComputedStyle(document.getElementsByTagName('body')[0]).fontFamily
    let popover = document.createElement('div')
    popover.style.background = circle.getAttribute('popupcolor')
    popover.style.color = '#333'
    popover.style.padding = '10px'
    popover.style.borderRadius = '8px'
    popover.style.position = 'relative'
    popover.style.fontFamily = '"Roboto", sans-serif'
    popover.style.overflow = 'hidden'

    let style = `
        margin: 0;
        text-align: left;
        margin-bottom: .6em;
        line-height: 1.4em;
        padding-left: 32px;
        position: relative;
    `
    let linkStyle = `
        text-decoration: none;
        color: #333;
    `
    let iconStyle = `
        position: absolute;
        top: 0;
        left: 0;
        font-size: 1em;
        line-height: 1.4em;
    `
    let innerHTML = ''
    if (circle.getAttribute('linktext') !== 'N/A') {
        innerHTML += `    
        <p style="${style}" style="font-family: ${fontFamily}">
            <i style="${iconStyle}" class="icon-globe"> </i>
            <a href="${circle.getAttribute('linkurl')}" style="${linkStyle}">${circle.getAttribute('linktext').replace(new RegExp('newline', 'g'), '<br/>')}</a>
        </p>
        `
    }
    if (circle.getAttribute('email') !== 'N/A') {
        innerHTML += `
        <p style="${style}">
            <i style="${iconStyle} transform: scale(.8) translateX(-4px) translateY(2px);" class="icon-envelope"> </i>
            <a href="mailto:${circle.getAttribute('email')}" style="${linkStyle}">${circle.getAttribute('email')}</a>
        </p>
        `
    }
    if (circle.getAttribute('phone') !== 'N/A') {
        innerHTML += `
        <p style="${style}">
            <i style="${iconStyle}" class="icon-phone"> </i>
            <em>${circle.getAttribute('phone')}</em>
        </p>
        `
    }
    popover.innerHTML = innerHTML
    if (innerHTML === "") {
        popover.style.padding = 0
    }
    
    foreign.style.overflow = 'visible'
    triangle.style.overflow = 'visible'

    function resize() {
        // console.log('resize')
        let svgWidth = circle.parentNode.getBBox().width
        let pwidth = 1000
        let rwidth = 400
        let wRatio = pwidth / svgWidth
        let width = wRatio * rwidth
        let height = wRatio * rwidth * 2
        
        foreign.setAttribute('width', Math.min(width, 800))
        foreign.setAttribute('height', Math.min(height, 1600))
        foreign.style.fontSize = 24 * wRatio + 'px'
        foreign.style.padding = 10 * wRatio + 'px'
        
        foreign.setAttribute('x', Math.max(20, +circle.getAttribute('cx') - width / 2))
        foreign.setAttribute('y', Math.max(20, +circle.getAttribute('cy') + 15 * wRatio ))
        
        // popover.style.marginTop = -10 * wRatio + 'px'
        popover.style.padding = 12 * wRatio + 'px'
        
        triangle.setAttribute('width', 30 * wRatio)
        triangle.setAttribute('height', 30 * wRatio)
        triangle.setAttribute('x', +circle.getAttribute('cx') - 15 * wRatio)
        triangle.setAttribute('y', +circle.getAttribute('cy') + 15 * wRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    triangle.innerHTML = `
    <body xmlns="http://www.w3.org/1999/xhtml">
        <div style='width: 100%; height: 100%; background: ${circle.getAttribute('popupcolor')}; transform: rotate(45deg)'></div>
    </body>
    `

    let bodyWrap = document.createElement('body')
    bodyWrap.setAttribute('xmlns', "http://www.w3.org/1999/xhtml")
    bodyWrap.appendChild(popover)
    foreign.appendChild(bodyWrap)
    circle.parentNode.appendChild(triangle)
    circle.parentNode.appendChild(foreign)
}

function hidePopover() {
    console.log('hide')
    let nodes = document.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'foreignObject')
    // document.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'foreignObject')
    while(nodes[0]) {
        nodes[0].parentNode.removeChild(nodes[0])
    }
}
//////////
