<script>
    import { fade } from 'svelte/transition'
    import Icon from '../ui/Icon.svelte'
    import HelpItem from '../ui/HelpItem.svelte'
    import { helpTextStore } from '../store/help'
    import apData from '../store/data'

    export let striped = false
    export let highlight = false

    export let head = {}
    export let rows = []

    console.log(rows);

    let sorted_by;
    let sorted_asc = {};

    $: newRows = addPropsToRows(head, rows)

    // returns array of object keys
    const keys = (obj) => {
        return Object.keys(obj)
    }

    // get string or object value
    const val = (attr) => {
        if (!attr) return "";
        if (typeof attr === "object") return attr.title || "";
        return attr;
    } 

    const component = (attr) => {
        if (!attr) return '';
        if ((typeof attr === "object" && typeof attr.component === "function") || typeof attr === "function") {
            return attr.component
        }
        return attr
    }

    const props = (attr) => {
        if (typeof attr === "object") return attr.props || {};
        return {};
    }

    const addPropsToRows = (headers, rows) => {
        rows.forEach((row) => {
            keys(headers).forEach((h) => {
                if (headers[h].type === 'component' && headers[h].hasOwnProperty('propModel')) {
                    let props = {}
                    let propModel = Object.entries(headers[h].propModel)
                    propModel.forEach((prop) => {
                        props[prop[0]] = row[prop[1]]
                        row.props = props
                    })
                }
            })
        })
        return rows
    }

    const sort = (h) => {
        let data
        if (sorted_asc[h]) {
            data = $apData.sort((a,b) => a[h]<b[h] ? 1:-1)
            sorted_asc[h] = false;
        } else {
            data = $apData.sort((a,b) => a[h]>b[h] ? 1:-1)
            sorted_asc[h] = true;
        }
        apData.setApData(data)
        sorted_by = h;
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
</script>

<style>
    table {
        width: 100%;
        display: table;
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 1.2rem;
    }

    table, th, td {
        border: none;
    }

    thead {
        color: rgba(0,0,0,0.6);
    }

    /* th {
        position: sticky;
        top: 5rem;
        background-color: #fff;
        z-index: 1;
    } */

    tr {
        border-bottom: 1px solid rgba(0,0,0,0.12);
    }

    td, th {
        padding: 7px 4px;
        display: table-cell;
        text-align: left;
        vertical-align: middle;
        border-radius: 2px;
    }

    table.striped>tbody>tr:nth-child(odd) {
        background-color: rgba(242,242,242,0.5);
    }

    table.striped tr {
        border-bottom: none;
    }

    table.highlight>tbody>tr {
        -webkit-transition: background-color .25s ease;
        transition: background-color .25s ease;
    }

    table.highlight>tbody>tr:hover {
        background-color: rgba(242,242,242,0.5);
    }

    a {
        text-decoration: underline;
        display: flex;
        align-items: center;
    }

    .sortable {
        cursor: pointer;
    }

</style>

<table class:striped="{striped}" class:highlight="{highlight}">
    <thead>
        <tr>
            {#each keys(head) as h}
                {#if head[h].render}
                    <th style="width: {head[h].width ? head[h].width : "unset"}{head[h].width ? "px" : ""};" >
                        {#if head[h].sort}
                            <HelpItem helpText={$helpTextStore.sort}>
                            <div on:click={() => sort(h)} class="sortable">
                                {#if sorted_by !== h}
                                    {val(head[h])} <Icon name="chevron-up-down" size=15 />
                                {:else}
                                    {#if sorted_asc[h]}
                                        {val(head[h])} <Icon name="chevron-down" size=15 />
                                    {:else}
                                        {val(head[h])} <Icon name="chevron-up" size=15 />
                                    {/if}
                                {/if}
                            </div>
                            </HelpItem>
                            {:else}
                            {val(head[h])}
                        {/if}
                    </th>
                {/if}
            {/each}
        </tr>
    </thead>

    <tbody>
        {#each newRows as row, i}
            <tr class="c-{row.item}">
                {#each keys(head) as h}
                    {#if head[h].render}
                        <td>
                            {#if head[h].type === 'component'}
                                <svelte:component this={component(head[h])} {...props(row)} />
                            {:else if head[h].type === 'link' && row.HasDoc === 22}
                                <a href="{head[h].link}{row[head[h].linkVar]}" 
                                    target="popup"
                                    on:click={() => {window.open("", "popup", "width=1000,height=700"); return false;}}
                                >
                                    {val(row[h])} 
                                    <Icon name="external-link" size=12 />
                                </a>
                            {:else if head[h].type === 'value'}
                                {#if head[h].format === 'currency'}
                                    {formatter.format(val(row[h]))}
                                {:else}
                                    {val(row[h])}
                                {/if}
                            {:else}
                                {val(row[h])}
                            {/if}
                        </td>
                    {/if}
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
