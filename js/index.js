
function cityCircleMouseover(event) {
    console.log('mouseover')
    // event.setAttribute('r', +event.getAttribute('r') * 5.0 / 4.0)
    showPopover(event)
}

function cityCircleMouseout(event) {
    // event.setAttribute('r', +event.getAttribute('r') * 4.0 / 5.0)
    // hidePopover()
}

function cityCircleClick (event) {
    console.log('click ', event)
    showPopover(event)
}

function showPopover(circle) {
    hidePopover()
    let popoverWidth = 200
    let popover = document.createElement('div')
    let fontFamily = window.getComputedStyle(document.getElementsByTagName('body')[0]).fontFamily
    popover.style.background = circle.getAttribute('popupcolor')
    popover.style.color = '#333'
    popover.style.padding = '10px'
    popover.style.borderRadius = '4px'
    popover.style.padding = '8px'
    popover.style.position = 'absolute'
    popover.style.fontFamily = '"Roboto", sans-serif'
    popover.style.fontSize = '12px'
    popover.style.overflow = 'hidden'
    popover.style.width = popoverWidth + 'px'
    popover.style.top = 0
    popover.style.left = 0
    popover.classList.add('map-popover')
    popover.style.opacity = 0
    popover.style.transition = 'all .4s ease'

    let fontColor = circle.getAttribute('fontcolor') || '#eee'

    let style = `
        margin: 0;
        text-align: left;
        margin-bottom: .6em;
        line-height: 1.4em;
        padding-left: 32px;
        position: relative;
        color: ${fontColor};
    `
    let linkStyle = `
        text-decoration: none;
        color: ${fontColor};
    `
    let iconStyle = `
        position: absolute;
        top: 0;
        left: 0;
        font-size: 1em;
        line-height: 1.4em;
    `

    let triangle = document.createElement('div')
    triangle.style.width = 0
    triangle.style.height = 0
    triangle.style['border-style'] = 'solid'
    triangle.style['border-width'] = '0 7.5px 10px 7.5px'
    triangle.style['border-color'] = `transparent transparent ${circle.getAttribute('popupcolor')} transparent`
    triangle.style.position = 'absolute'
    triangle.style.transition = 'all .4s ease'
    triangle.style.opacity = 0.0
    triangle.classList.add('map-popover')

    setTimeout(() => popover.style.opacity = 1, 100)
    setTimeout(() => triangle.style.opacity = 1, 100)

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
            <i style="${iconStyle}" class="icon-envelope"> </i>
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


    function resize() {
        let svg = circle.parentNode
        let svgWidth = Math.min(550, svg.parentNode.getBoundingClientRect().width)
        let svgHeight = svg.parentNode.getBoundingClientRect().height
        // console.log('svgWidth', svgWidth)
        // console.log('svgHeight', svgHeight)
        let cx = svgWidth * (+circle.getAttribute('cx')) / 1000.0 
        let cy = svgHeight * (+circle.getAttribute('cy')) / 1360.0
        // console.log('cx, cy', cx, cy)

        popover.style.top = (10 + cy) + 'px'
        popover.style.left = (cx - popoverWidth/2) + 'px'

        triangle.style.top = cy + 'px'
        triangle.style.left = (cx - 7.5) + 'px'
    }

    resize()
    window.addEventListener('resize', resize)
    
    circle.parentNode.parentNode.appendChild(triangle)
    circle.parentNode.parentNode.appendChild(popover)
}

function hidePopover() {
    console.log('hide')
    let nodes = document.getElementsByClassName('map-popover')
    while(nodes[0]) {
        nodes[0].parentNode.removeChild(nodes[0])
    }
}
