<template>
    <div id="new">
        <h1>Create new project</h1>
        <div class="template">
            <h3 class="template-name">simple webpage</h3>
            <p>Create a simple webpage with HTML, CSS and JavaScript.</p>
        </div>
        <div class="template">
            <h3 class="template-name">simple nodejs</h3>
            <p>Creates a RunKit playground to run Node.js code.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "New"
}
</script>

<style scoped>

#new {
    padding: 15vw;
}

.template {
    border-radius: 9px;
    border: 1px solid yellow;
    padding: 10px 20px;
    margin-top: 30px;
}

.template:hover {
    cursor: pointer;
    box-shadow: none;
}

.template-name {
    font-family: "Fira Mono";
}
</style>