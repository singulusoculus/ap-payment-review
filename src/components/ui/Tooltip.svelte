<script>
    import { scale, fade, fly } from "svelte/transition";

    export let show = false;
    export let tip = ''
    export let timeout = null;
    export let delayHide = 100;
    export let delayShow = 100;

    const showTooltip = () => {
        if (show) return;

        show = true;

        if (!timeout) return;

        timeout = setTimeout(() => {
        show = false;
        }, timeout);
    }

    const hideTooltip = () => {
        if (!show) return;

        show = false;
        clearTimeout(timeout);
    }

    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
        let context = this,
            args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
        };
  }


</script>

<style>
    .tooltip {
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        margin-top: 1rem;
        background-color: #323232;
        color: #fff;
        border-radius: 5px;
        padding: .5rem .8rem;
        z-index: 200;
        white-space: nowrap
    }

    .tooltip::before {
        width: 1rem;
        height: 1rem;
        background-color: #323232;
        content: "";
        position: absolute;
        left: 45%;
        top: -.4rem;
        transform: rotate(45deg);
        border-radius: 2px;
    }

    .activator {
        position: relative;
    }

</style>

<div class="activator">
    <div
      on:mouseenter={debounce(showTooltip, delayShow)}
      on:mouseleave={debounce(hideTooltip, delayHide)}
      on:mouseenter
      on:mouseleave
      on:mouseover
      on:mouseout
    >
      <slot name="activator" />
    </div>
  
    {#if show}
      <div 
        class="tooltip"
        in:fly="{{ y: 10, duration: 300 }}"
        out:fly="{{y:10, duration: 300}}"
      >
        {tip}
      </div>
    {/if}
  </div>

  <!-- in:scale={{ duration: 150 }}
  out:scale={{ duration: 150, delay: 100 }} -->