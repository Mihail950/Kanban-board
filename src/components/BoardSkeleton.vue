<template>
    <div class="board-box">
        <div class="kanban-board">
            <div class="column">
                <div class="column-header">
                    <div class="column-header-information">
                        <p class="column-title"></p>
                        <p class="column-task-quantity"></p>
                    </div>
                    <button class="more-btn">
                        <img src="../assets/image/more-icon.svg" alt="">
                    </button>
                </div>
                <div class="task">
                    <div class="task-header">
                        <p class="task-title"></p>
                        <button class="more-btn">
                            <img src="../assets/image/more-icon.svg" width="5px">
                        </button>
                    </div>
                    <p class="task-description"></p>
                    <p class="task-date"></p>
                </div>
                <div class="task">
                    <div class="task-header">
                        <p class="task-title"></p>
                        <button class="more-btn">
                            <img src="../assets/image/more-icon.svg" width="5px">
                        </button>
                    </div>
                    <p class="task-description"></p>
                    <p class="task-date"></p>
                </div>
                <div class="task">
                    <div class="task-header">
                        <p class="task-title"></p>
                        <button class="more-btn">
                            <img src="../assets/image/more-icon.svg" width="5px">
                        </button>
                    </div>
                    <p class="task-description"></p>
                    <p class="task-date"></p>
                </div>
            </div>
            <div class="column">
                <div class="column-header">
                    <div class="column-header-information">
                        <p class="column-title"></p>
                        <p class="column-task-quantity"></p>
                    </div>
                    <button class="more-btn">
                        <img src="../assets/image/more-icon.svg" alt="">
                    </button>
                </div>
                <div class="task">
                    <div class="task-header">
                        <p class="task-title"></p>
                        <button class="more-btn">
                            <img src="../assets/image/more-icon.svg" width="5px">
                        </button>
                    </div>
                    <p class="task-description"></p>
                    <p class="task-date"></p>
                </div>
                <div class="task">
                    <div class="task-header">
                        <p class="task-title"></p>
                        <button class="more-btn">
                            <img src="../assets/image/more-icon.svg" width="5px">
                        </button>
                    </div>
                    <p class="task-description"></p>
                    <p class="task-date"></p>
                </div>
                <div class="task">
                    <div class="task-header">
                        <p class="task-title"></p>
                        <button class="more-btn">
                            <img src="../assets/image/more-icon.svg" width="5px">
                        </button>
                    </div>
                    <p class="task-description"></p>
                    <p class="task-date"></p>
                </div>
            </div>
            <div class="column">
                <div class="column-header">
                    <div class="column-header-information">
                        <p class="column-title"></p>
                        <p class="column-task-quantity"></p>
                    </div>
                    <button class="more-btn">
                        <img src="../assets/image/more-icon.svg" alt="">
                    </button>
                </div>
                <div class="task">
                    <div class="task-header">
                        <p class="task-title"></p>
                        <button class="more-btn">
                            <img src="../assets/image/more-icon.svg" width="5px">
                        </button>
                    </div>
                    <p class="task-description"></p>
                    <p class="task-date"></p>
                </div>
                <div class="task">
                    <div class="task-header">
                        <p class="task-title"></p>
                        <button class="more-btn">
                            <img src="../assets/image/more-icon.svg" width="5px">
                        </button>
                    </div>
                    <p class="task-description"></p>
                    <p class="task-date"></p>
                </div>
                <div class="task">
                    <div class="task-header">
                        <p class="task-title"></p>
                        <button class="more-btn">
                            <img src="../assets/image/more-icon.svg" width="5px">
                        </button>
                    </div>
                    <p class="task-description"></p>
                    <p class="task-date"></p>
                </div>
            </div>
            <div class="column">
                <div class="column-header">
                    <div class="column-header-information">
                        <p class="column-title"></p>
                        <p class="column-task-quantity"></p>
                    </div>
                    <button class="more-btn">
                        <img src="../assets/image/more-icon.svg" alt="">
                    </button>
                </div>
                <div class="task">
                    <div class="task-header">
                        <p class="task-title"></p>
                        <button class="more-btn">
                            <img src="../assets/image/more-icon.svg" width="5px">
                        </button>
                    </div>
                    <p class="task-description"></p>
                    <p class="task-date"></p>
                </div>
                <div class="task">
                    <div class="task-header">
                        <p class="task-title"></p>
                        <button class="more-btn">
                            <img src="../assets/image/more-icon.svg" width="5px">
                        </button>
                    </div>
                    <p class="task-description"></p>
                    <p class="task-date"></p>
                </div>
                <div class="task">
                    <div class="task-header">
                        <p class="task-title"></p>
                        <button class="more-btn">
                            <img src="../assets/image/more-icon.svg" width="5px">
                        </button>
                    </div>
                    <p class="task-description"></p>
                    <p class="task-date"></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style scoped>
    .board-box{
    position: fixed;
    height: 100%;
    width: 100%;
    padding-left: 297px;
    padding-top: 155px;
    box-sizing: border-box;
    z-index: 1;
}
.kanban-board{
    height: 100%;
    width: 100%;
    z-index: 10;
    background-color: var(--main-border);
    display: flex;
}
.column{
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 20px;
    padding-top: 18px;
}
.column-header{
    display: flex;
    justify-content: space-between;
    padding: 0 15px 0 15px;
    align-items: center;
    padding-bottom: 18px;
}
.column-header-information{
    display: flex;
    gap: 14px;
    align-items: center;
}
.column-title{
    width: 80px;
    height: 20px;
    background: linear-gradient(
        120deg,
        var(--load-line-1) 30%,
        var(--load-line-2) 38%,
        var(--load-line-2) 40%,
        var(--load-line-1) 48%
    );
    background-size: 200% 100%;
    background-position: 100% 0;
    animation: load 2s infinite;
}
.column-task-quantity{
    width: 32px;
    height: 20px;
    background: linear-gradient(
        120deg,
        var(--load-line-1) 30%,
        var(--load-line-2) 38%,
        var(--load-line-2) 40%,
        var(--load-line-1) 48%
    );
    background-size: 200% 100%;
    background-position: 100% 0;
    animation: load 2s infinite;
    border-radius: 10px;
}
.more-btn{
    display: flex;
    justify-content: center;
    align-items: center;
}
.task{
    width: 226px;
    height: 96px;
    background-color: var(--main-background);
    border-radius: 6px;
    padding: 12px;
}
.task-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
}
.task-title{
    width: 80px;
    height: 18px;
    background: linear-gradient(
        120deg,
        var(--load-line-1) 30%,
        var(--load-line-2) 38%,
        var(--load-line-2) 40%,
        var(--load-line-1) 48%
    );
    background-size: 200% 100%;
    background-position: 100% 0;
    animation: load 2s infinite;
}
.task-description{
    margin-bottom: 14px;
    width: 210px;
    height: 35px;
    background: linear-gradient(
        120deg,
        var(--load-line-1) 30%,
        var(--load-line-2) 38%,
        var(--load-line-2) 40%,
        var(--load-line-1) 48%
    );
    background-size: 200% 100%;
    background-position: 100% 0;
    animation: load 2s infinite;
}
.task-date{
    height: 22px;
    width: 85px;
    background: linear-gradient(
        120deg,
        var(--load-line-1) 30%,
        var(--load-line-2) 38%,
        var(--load-line-2) 40%,
        var(--load-line-1) 48%
    );
    background-size: 200% 100%;
    background-position: 100% 0;
    animation: load 2s infinite;
    border-radius: 10px;
    margin-left: -4px;
}
@keyframes load {
    100%{
        background-position: -100% 0;
    }
}
</style>
