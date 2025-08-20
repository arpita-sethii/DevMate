# model/code_interpretor.py

from langchain.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

llm = Ollama(model="mistral")  

prompt = PromptTemplate(
    input_variables=["code"],
    template="""
You are DevMate, a powerful AI programming assistant. A user submitted the following Python code:

{code}

Explain what it does, find any potential bugs, inefficiencies, and suggest improvements.
Return your answer in markdown format with:
1. ✅ Overview
2. 🐞 Bug Analysis
3. ⚙️ Code Improvements
4. 💡 Best Practices
"""
)

chain = LLMChain(prompt=prompt, llm=llm)

def analyze_code(code: str) -> str:
    return chain.run(code)
