class Scanner {
    constructor(blocks) {
    this.blocks = blocks;
    this.tokens = [];
  }

  scan() {
    for (const block of this.blocks) {
      this.scanBlock(block);
    }

    return this.tokens;
  }

  scanBlock(block) {
    switch (block.type) {
      case "card":
        this.tokens.push({
          type: TokenType.CARD,
          value: block.name
        });

        if (block.children) {
          for (const child of block.children) {
            this.scanBlock(child);
          }
        }

        break;

      case "cost":
        this.tokens.push({
          type: TokenType.COST
        });

        this.tokens.push({
          type: TokenType.NUMBER,
          value: block.value
        });

        break;

      case "damage":
        this.tokens.push({
          type: TokenType.DAMAGE
        });

        this.tokens.push({
          type: TokenType.NUMBER,
          value: block.value
        });

        break;

      default:
        throw new Error(
          `Unknown block type: ${block.type}`
        );
    }
  }
}