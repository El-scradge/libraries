module.exports = class ToolTips {
	/**
	 * list of tooltip elements
	 * @type {[]}
	 */
	toolTips = [];
	/**
	 * current hovered toolips
	 */
	currentToolTip;
	/**
	 * array of mouseover listeners
	 * @type {[]}
	 */
	mouseEnterListeners = [];
	/**
	 * array of mouse out listeners
	 * @type {[]}
	 */
	mouseLeaveListeners = [];
	/**
	 * hover timout. canceled when mouse leave is triggered
	 */
	hoverTimeout;

	/**
	 * finds the current potential tooltips with a "data-title" attribute
	 */
	findTooltips() {
		this.toolTips = [];

		this.toolTips = document.querySelectorAll('[data-title]');
		console.log('toolTips', this.toolTips)
		this.toolTips.forEach(tooltip => {
			tooltip.addEventListener('mouseover',this.addToolTip)
			tooltip.addEventListener('mouseout', this.removeToolTip)

		})
	}

	/**
	 * removes all the event listeners if need be.
	 */
	resetTooltips () {
		this.mouseEnterListeners.forEach(listener => {
			listener.removeListener()
		})
	}
	/**
	 * takes the on mouseover event and attaches a tooltip
	 * @param event
	 */
	addToolTip(event) {
		event.preventDefault()
		if(!this.currentToolTip) {
			this.hoverTimeout = setTimeout(() => {
				this.currentToolTip = document.createElement('div');
				this.currentToolTip.classList.add('tooltip--custom')
				this.currentToolTip.style.top = (event.pageY + 10) + 'px'
				this.currentToolTip.id = 'toolTip'
				this.currentToolTip.innerHTML = event.target.dataset.title;
				event.target.append(this.currentToolTip)
				const nearWindowEdge =  event.pageX + this.currentToolTip.offsetWidth >=  window.innerWidth
				const nearWindowBottom = event.pageY + this.currentToolTip.offsetHeight >=  window.innerHeight
				let positionLeft = !nearWindowEdge ? event.pageX : event.pageX - (this.currentToolTip.offsetWidth + 70)
				let positionBottom = !nearWindowBottom ? event.pageY : event.pageY + (this.currentToolTip.offsetHeight - 70)
				console.log('tooltip position', nearWindowBottom, positionBottom, event.pageY)
				this.currentToolTip.style.left = positionLeft + 'px'
				this.currentToolTip.style.top = positionBottom + 'px'
			}, 1000)

		}

	}

	/**
	 * takes the event and removes the last tooltip from the target elemnent
	 * @param e mouse event
	 */
	removeToolTip(e) {
		if (typeof this.hoverTimeout === 'number') {
			clearTimeout(this.hoverTimeout);
		}
		if (this.currentToolTip)e.target.removeChild(this.currentToolTip);
		this.currentToolTip = undefined
		console.log('remove?',e.target)


	}
}

// let tooltips = new ToolTips();
//
