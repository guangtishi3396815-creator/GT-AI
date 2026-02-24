// API配置 - 部署后修改为你的Vercel地址
const API_BASE_URL = ''; // 空字符串表示同源，或填写 'https://your-app.vercel.app'

// 修改手动生成函数，调用API
async function manualGenerate(type) {
    const output = document.getElementById('manual-output');
    output.innerHTML = '<div class="loading">AI正在深度生成内容...</div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: type })
        });
        
        if (!response.ok) {
            throw new Error('生成失败');
        }
        
        const data = await response.json();
        
        if (data.success) {
            // 保存到数据库
            const item = {
                id: Date.now().toString(36),
                type: data.type,
                typeName: data.typeName,
                title: data.title,
                content: data.content,
                theme: data.theme,
                concept: data.concept,
                quote: data.quote,
                model: data.model,
                createdAt: data.createdAt
            };
            
            contentDB.unshift(item);
            stats[item.type]++;
            stats.total++;
            saveData();
            updateStatsDisplay();
            
            // 显示内容
            output.textContent = data.content;
            
            // 显示AI信息
            showNotification(`✨ AI生成完成 | 模型: ${data.model} | Token: ${data.usage?.total_tokens || 'N/A'}`);
        } else {
            throw new Error(data.message || '生成失败');
        }
        
    } catch (error) {
        output.innerHTML = `<div style="color:#e74c3c">生成失败: ${error.message}<br><br>请检查:<br>1. API是否部署成功<br>2. OpenAI API Key是否配置正确<br>3. 网络连接是否正常</div>`;
    }
}

// 批量生成函数
async function generateBatch() {
    const types = ['essay', 'viewpoint', 'quote', 'video', 'article', 'moments'];
    const batch = [];
    
    for (const type of types) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: type })
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    batch.push({
                        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
                        type: data.type,
                        typeName: data.typeName,
                        title: data.title,
                        content: data.content,
                        theme: data.theme,
                        createdAt: data.createdAt
                    });
                }
            }
        } catch (e) {
            console.error(`生成 ${type} 失败:`, e);
        }
    }
    
    return batch;
}